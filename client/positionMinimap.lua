local defaultAspectRatio = 1920 / 1080 -- Don't change this.
local resolutionX, resolutionY = GetActiveScreenResolution()
local aspectRatio = resolutionX / resolutionY
local minimapOffset = 0.0

-- ✅ Change this to move EVERYTHING up/down
-- Positive = up, Negative = down (try 0.005 / -0.005 etc.)
local minimapYOffset = 0.0

if aspectRatio > defaultAspectRatio then
    minimapOffset = ((defaultAspectRatio - aspectRatio) / 3.6) - 0.008
end

RequestStreamedTextureDict('squaremap', false)
while not HasStreamedTextureDictLoaded('squaremap') do
    Wait(150)
end

SetMinimapClipType(0)
AddReplaceTexture('platform:/textures/graphics', 'radarmasksm', 'squaremap', 'radarmasksm')
AddReplaceTexture('platform:/textures/graphics', 'radarmask1g', 'squaremap', 'radarmasksm')

-- Base Y positions (unchanged), we just add minimapYOffset to each
local minimapBaseY = -0.047
local maskBaseY   =  0.000
local blurBaseY   =  0.025

-- Minimap frame
SetMinimapComponentPosition('minimap', 'L', 'B',
    0.0 + minimapOffset,
    minimapBaseY + minimapYOffset,
    0.1638, 0.183
)

-- Icons within map
SetMinimapComponentPosition('minimap_mask', 'L', 'B',
    0.0 + minimapOffset,
    maskBaseY + minimapYOffset,
    0.128, 0.20
)

-- Blur/background
SetMinimapComponentPosition('minimap_blur', 'L', 'B',
    -0.01 + minimapOffset,
    blurBaseY + minimapYOffset,
    0.262, 0.300
)

SetBlipAlpha(GetNorthRadarBlip(), 0)
SetBigmapActive(true, false)
SetMinimapClipType(0)
Wait(50)
SetBigmapActive(false, false)
Wait(1200)