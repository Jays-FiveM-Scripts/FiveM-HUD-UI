-- client.lua (FiveM) - Per-character KVP hunger/thirst + NUI updates
-- Stores needs per *character key* on the client using Resource KVP.
-- You MUST set the active character key when the player selects/loads a character.

local ActiveCharKey = nil
local hunger = 100
local thirst = 100

-- ====== Config ======
local NEEDS_DEFAULT_HUNGER = 100
local NEEDS_DEFAULT_THIRST = 100

-- Optional: simple decay (set to 0 to disable)
local HUNGER_DECAY_PER_MIN = 0
local THIRST_DECAY_PER_MIN = 0

-- ====== Helpers ======
local function clamp(v, minV, maxV)
    v = tonumber(v) or 0
    if v < (minV or 0) then return (minV or 0) end
    if v > (maxV or 100) then return (maxV or 100) end
    return v
end

local function serverNamespace()
    local ep = (GetCurrentServerEndpoint and GetCurrentServerEndpoint()) or "offline"
    if not ep or ep == "" then ep = "offline" end
    return (ep:gsub("[%:%./%s]", "_"))
end

local function needsKey(charKey)
    return ("ctrl_hud:needs:%s:%s"):format(serverNamespace(), tostring(charKey))
end

local function loadNeeds(charKey)
    if not charKey then return NEEDS_DEFAULT_HUNGER, NEEDS_DEFAULT_THIRST end

    local raw = GetResourceKvpString(needsKey(charKey))
    if not raw or raw == "" then
        return NEEDS_DEFAULT_HUNGER, NEEDS_DEFAULT_THIRST
    end

    local ok, data = pcall(json.decode, raw)
    if not ok or type(data) ~= "table" then
        return NEEDS_DEFAULT_HUNGER, NEEDS_DEFAULT_THIRST
    end

    return clamp(data.hunger, 0, 100), clamp(data.thirst, 0, 100)
end

local function saveNeeds(charKey, h, t)
    if not charKey then return end

    local payload = {
        hunger = clamp(h, 0, 100),
        thirst = clamp(t, 0, 100),
        t = GetGameTimer()
    }

    SetResourceKvp(needsKey(charKey), json.encode(payload))
end

local function setNeeds(h, t)
    hunger = clamp(h, 0, 100)
    thirst = clamp(t, 0, 100)
    saveNeeds(ActiveCharKey, hunger, thirst)
end

local function addNeeds(dHunger, dThirst)
    setNeeds(hunger + (tonumber(dHunger) or 0), thirst + (tonumber(dThirst) or 0))
end

-- ====== Public API: call these when items are used ======

-- Eating: increases hunger
local function consumeFood(amount)
    addNeeds(math.abs(tonumber(amount) or 0), 0)
end

-- Drinking: increases thirst
local function consumeDrink(amount)
    addNeeds(0, math.abs(tonumber(amount) or 0))
end

-- Generic (can be negative too if you want)
local function modifyNeeds(dHunger, dThirst)
    addNeeds(dHunger or 0, dThirst or 0)
end

-- Exports (optional)
exports("ConsumeFood", consumeFood)
exports("ConsumeDrink", consumeDrink)
exports("ModifyNeeds", modifyNeeds)

-- ====== Set active character ======
-- Call this AFTER multichar loads/selects a character.
-- Example: TriggerEvent("ctrl_hud:setActiveCharacter", ActiveCharKey)

local function setActiveCharacter(charKey)
    ActiveCharKey = tostring(charKey)
    hunger, thirst = loadNeeds(ActiveCharKey)
    -- Immediately persist defaults if nothing existed yet
    saveNeeds(ActiveCharKey, hunger, thirst)
end

RegisterNetEvent("ctrl_hud:setActiveCharacter", function(charKey)
    if not charKey then return end
    setActiveCharacter(charKey)
end)

-- ====== Item consume events (wire these to your inventory/usable items) ======
-- Examples:
--   TriggerEvent("ctrl_hud:consumeFood", 25)
--   TriggerEvent("ctrl_hud:consumeDrink", 20)
--   TriggerEvent("ctrl_hud:modifyNeeds", -5, -10)

RegisterNetEvent("ctrl_hud:consumeFood", function(amount)
    consumeFood(amount)
end)

RegisterNetEvent("ctrl_hud:consumeDrink", function(amount)
    consumeDrink(amount)
end)

RegisterNetEvent("ctrl_hud:modifyNeeds", function(dHunger, dThirst)
    modifyNeeds(dHunger, dThirst)
end)

-- ====== Optional decay loop ======
CreateThread(function()
    while true do
        Wait(60000)
        if ActiveCharKey and (HUNGER_DECAY_PER_MIN > 0 or THIRST_DECAY_PER_MIN > 0) then
            addNeeds(-HUNGER_DECAY_PER_MIN, -THIRST_DECAY_PER_MIN)
        end
    end
end)

-- ====== HUD update loop (NUI message) ======
local function getHealthPercent(ped)
    local hp = GetEntityHealth(ped)
    local maxHp = GetEntityMaxHealth(ped)
    if not maxHp or maxHp <= 0 then return 0 end
    return clamp((hp / maxHp) * 100.0, 0, 100)
end

local function updateHUD(ped)
            -- If no active character key, you can still show defaults
        local h = hunger
        local t = thirst
        local health = math.ceil(GetEntityHealth(ped)) - 100
        local armour = math.ceil(GetPedArmour(ped))
        print(("HUD Update - Health: %d, Armour: %d, Hunger: %d, Thirst: %d"):format(health, armour, h, t))
        SendNUIMessage({
            type = "hud:update",
            health = clamp(health, 0, 100),
            armour = clamp(armour, 0, 100),
            hunger = clamp(h, 0, 100),
            thirst = clamp(t, 0, 100)
        })
    end

CreateThread(function()
    while true do
        Wait(5000)

        local ped = PlayerPedId()
        if not DoesEntityExist(ped) then goto continue end
        updateHUD(ped)
        ::continue::
    end
end)

-- ====== Safety: save needs on resource stop ======
AddEventHandler("onResourceStop", function(res)
    if res ~= GetCurrentResourceName() then return end
    if ActiveCharKey then
        saveNeeds(ActiveCharKey, hunger, thirst)
    end
end)

AddEventHandler('gameEventTriggered', function (name, args)
--   print('game event ' .. name .. ' (' .. json.encode(args) .. ')')
  if name == "CEventNetworkEntityDamage" then
    local victim = args[1]
    local attacker = args[2]
    local damage = args[3]
    -- print(("Damage event - Victim: %d, Attacker: %d, Damage: %d"):format(victim, attacker, damage))
    updateHUD(victim)
  end
end)