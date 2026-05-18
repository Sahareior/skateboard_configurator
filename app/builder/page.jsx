import React from 'react'
import { CustomControlProvider } from './Context'
import Preview from './Preview'
import Controls from './Controls'

const BoardBuilder = (props) => {
  // ─── Wheel Textures ───────────────────────────────────────────────────────────
  const wheelData = [
    {
      uid: "white-rubber",
      texture: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=512&auto=format&fit=crop",
    },
    {
      uid: "black-rubber",
      texture: "https://images.unsplash.com/photo-1755858427149-8c57af476834?q=80&w=389&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      uid: "orange-urethane",
      texture: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=512&auto=format&fit=crop",
    },
    {
      uid: "yellow-plastic",
      texture: "https://images.unsplash.com/photo-1707723042624-0c4281a00bf7?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // ─── Deck Textures ────────────────────────────────────────────────────────────
  const deckData = [
    {
      uid: "classic-maple",
      texture: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=512&auto=format&fit=crop",
    },
    {
      uid: "dark-stained",
      texture: "https://images.unsplash.com/photo-1550895030-823330fc2551?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      uid: "worn-deck",
      texture: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=512&auto=format&fit=crop",
    },
    {
      uid: "bamboo",
      texture: "https://images.unsplash.com/photo-1554755229-ca4470e07232?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // ─── Metal Textures ───────────────────────────────────────────────────────────
  // Real CDN: f003.backblazeb2.com — confirmed from ambientCG page source
  const ACG = (id) =>
    `https://f003.backblazeb2.com/file/ambientCG-Web/media/surface-preview/${id}/${id}_SQ_Color.jpg`;

  const metalData = [
    { uid: "brushed-aluminium", texture: ACG("Metal009"), color: "#C0C0C0" },
    { uid: "raw-steel", texture: ACG("Metal011"), color: "#8E8E8E" },
    { uid: "worn-metal", texture: ACG("Metal006"), color: "#666666" },
    { uid: "galvanized-steel", texture: ACG("Metal022"), color: "#A8A8A8" },
    { uid: "rusty-iron", texture: ACG("Metal036"), color: "#8B4513" },
    { uid: "gold-edition", texture: ACG("Metal038"), color: "#FFD700" },
  ];

  const defaultWheel = wheelData[0];
  const defaultDeck = deckData[0];
  const defaultMetal = metalData[0];

  return (
    <div className='relative flex h-screen w-full overflow-hidden bg-zinc-950'>
      <CustomControlProvider
        defaultWheel={defaultWheel}
        defaultDeck={defaultDeck}
        defaultTruck={defaultMetal}
        defaultBolt={defaultMetal}
      >
        {/* Fullscreen Preview Background */}
        <div className='absolute inset-0 z-0'>
          <Preview />
        </div>

        {/* Floating Sidebar Controls */}
        <div className='absolute right-0 top-0 bottom-0 w-96 bg-black/20 backdrop-blur-xl border-l border-white/5 p-8 overflow-y-auto z-10'>
          <div className='flex flex-col gap-10'>
            <header>
              <h1 className='text-3xl font-bold text-white tracking-tight'>Build Your Board</h1>
              <p className='text-zinc-400 mt-2 text-sm'>Customize every part of your ride.</p>
            </header>
            <Controls wheels={wheelData} decks={deckData} metals={metalData} />
          </div>
        </div>
      </CustomControlProvider>
    </div>
  )
}

export default BoardBuilder