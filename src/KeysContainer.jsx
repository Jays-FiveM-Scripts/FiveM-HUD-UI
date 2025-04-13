function KeysContainer() {
    return (
        <>
            <div id='keys_container' className='w-full px-2 mt-60 flex flex-col items-center gap-4'>
                <div id='a_key' className='w-full flex gap-5 items-center'>
                    <div className='w-2 p-3 h-2 bg-blue-500 bg-opacity-90 ring-[.08rem] ring-blue-700 rounded-sm flex items-center justify-center'>
                        <h1>M</h1>
                    </div>
                    <h1>Phone</h1>
                </div>
                <div id='a_key' className='w-full flex gap-5 items-center'>
                    <div className='w-2 p-3 h-2 bg-blue-500 bg-opacity-90 ring-[.08rem] ring-blue-700 rounded-sm flex items-center justify-center'>
                        <h1>L</h1>
                    </div>
                    <h1>Inventory</h1>
                </div>
            </div>
        </>
    )
}

export default KeysContainer