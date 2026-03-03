-- client.lua (FiveM) - pushes RightContainer data (time/players/id/cash/bank) to React NUI
-- React should listen on window "message" and handle:
--   type: "right:update"  (bulk update recommended)
-- or individual:
--   type: "timeUpdate", "playersUpdate", "serverIdUpdate", "permIdUpdate", "cashUpdate", "bankUpdate"

local function clamp(n, a, b)
    n = tonumber(n) or 0
    if n < (a or 0) then return (a or 0) end
    if n > (b or 1e9) then return (b or 1e9) end
    return n
end

-- Format numbers like 200,521
local function formatNumber(n)
    n = math.floor(tonumber(n) or 0)
    local s = tostring(n)
    local out = s
    while true do
        out, k = out:gsub("^(-?%d+)(%d%d%d)", "%1,%2")
        if k == 0 then break end
    end
    return out
end

local function formatGBP(n)
    return "£" .. formatNumber(n)
end

local function sendRightUpdate(payload)
    SendNUIMessage(payload)
end

-- ============================================================
-- Time source:
-- 1) Use in-game clock (game time)
-- 2) Or real time using os.date (client machine)
-- ============================================================

local function getGameClockHHMM()
    local h = GetClockHours()
    local m = GetClockMinutes()
    return string.format("%02d:%02d", h, m)
end

-- If you prefer real time, swap to:
-- local function getRealClockHHMM()
--     return os.date("%H:%M")
-- end

-- ============================================================
-- Players online:
-- Best accuracy comes from server -> client event.
-- This client fallback uses local player count (not global).
-- ============================================================

local PlayersOnline = { current = 0, max = 0 }

RegisterNetEvent("hud:setPlayersOnline", function(current, max)
    PlayersOnline.current = tonumber(current) or PlayersOnline.current or 0
    PlayersOnline.max = tonumber(max) or PlayersOnline.max or 0
end)

-- ============================================================
-- IDs:
-- serverId = GetPlayerServerId(PlayerId())
-- permId is framework-specific; you should send it from server.
-- ============================================================

local PermId = nil
RegisterNetEvent("hud:setPermId", function(permId)
    PermId = tostring(permId)
end)

-- ============================================================
-- Money:
-- If ESX is present, use ESX.PlayerData.accounts and money.
-- Otherwise set via events from your server/framework.
-- ============================================================

local Cash = 0
local Bank = 0

    RegisterNetEvent("esx:setAccountMoney", function(account)
        if account.name == "money" then
    Cash = tonumber(account.money) or Cash or 0
        elseif account.name == "bank" then
    Bank = tonumber(account.money) or Bank or 0
        end
    end)

local function tryUpdateMoneyFromESX()
    if not ESX or not ESX.PlayerData then return end

    -- cash
    if ESX.PlayerData.money ~= nil then
        Cash = tonumber(ESX.PlayerData.money) or Cash
    end

    -- bank (accounts)
    if type(ESX.PlayerData.accounts) == "table" then
        for _, acc in ipairs(ESX.PlayerData.accounts) do
            if acc.name == "bank" then
                Bank = tonumber(acc.money) or Bank
                break
            end
        end
    end
end

-- ============================================================
-- Main push loop (bulk update)
-- ============================================================

CreateThread(function()
    while true do
        Wait(1000)

        -- pull from ESX if available
        tryUpdateMoneyFromESX()

        local timeStr = getGameClockHHMM()

        local serverId = GetPlayerServerId(PlayerId())
        local permId = PermId or tostring(serverId) -- fallback until server sends real perm id

        local playersStr
        if PlayersOnline.max and PlayersOnline.max > 0 then
            playersStr = string.format("%d / %d", PlayersOnline.current or 0, PlayersOnline.max)
        else
            -- fallback (not accurate globally): local pool count
            playersStr = string.format("%d / ?", #GetActivePlayers())
        end

        sendRightUpdate({
            type = "right:update",
            time = timeStr,
            players = playersStr,
            serverId = tostring(serverId),
            permId = tostring(permId),
            cash = formatGBP(Cash),
            bank = formatGBP(Bank),
        })
    end
end)

-- ============================================================
-- OPTIONAL: request updates from server periodically (recommended)
-- On your server you can reply with:
--   TriggerClientEvent("hud:setPlayersOnline", src, current, max)
--   TriggerClientEvent("hud:setPermId", src, permId)
--   TriggerClientEvent("hud:setMoney", src, cash, bank)
-- ============================================================

CreateThread(function()
    while true do
        Wait(5000)
        TriggerServerEvent("hud:requestRightData")
    end
end)