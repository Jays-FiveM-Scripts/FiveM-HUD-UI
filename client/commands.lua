-- client.lua (FiveM)
-- Use /showhud and /hidehud to toggle your React HUD

local function setHudVisible(state)
    SendNUIMessage({
        type = "hud:visible",
        visible = state and true or false
    })
    SetRadarBigmapEnabled(true, false)
    Wait(0)
    SetRadarBigmapEnabled(false, false)
end

RegisterCommand("showhud", function()
    setHudVisible(true)
end, false)

RegisterCommand("hidehud", function()
    setHudVisible(false)
end, false)

-- Optional: start hidden until you explicitly show
-- CreateThread(function()
--     Wait(500)
--     setHudVisible(false)
-- end)