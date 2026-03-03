fx_version 'cerulean'
game 'gta5'

files {
    "web/**"
}

ui_page "web/dist/index.html"

client_scripts {
    'client/**',
}

server_scripts {
    'server/**',
}

shared_scripts {
    "@es_extended/imports.lua",
    
}