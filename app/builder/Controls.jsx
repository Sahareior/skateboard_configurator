'use client'
import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import { useCustomeControlsContext } from "./Context";

const Controls = ({ wheels, decks, metals, className }) => {
  const deckInputRef = useRef(null);
  const wheelInputRef = useRef(null);

  const {
    setBolt,
    setDeck,
    setTruck,
    setWheel,
    selectedBolt,
    selectedDeck,
    selectedTruck,
    selectedWheel,
  } = useCustomeControlsContext();

  return (
    <div className={clsx("flex flex-col gap-8", className)}>
      <Options title="Deck"> 
          {decks.map((deck) => (
          <Option
            key={deck.uid}
            imageField={deck.texture}
            imgixParams={{
              rect: [20, 1550, 1000, 1000],
              width: 150,
              height: 150,
            }}
            selected={deck.uid === selectedDeck?.uid}
            onClick={() => setDeck(deck)}
          >
            {deck.uid?.replace(/-/g, " ")}
          </Option>
        ))}
          <li className="relative flex items-center justify-center">
            <button
              className={clsx(
                "relative size-10 cursor-pointer rounded-full bg-zinc-800 p-0.5 outline-2 outline-white flex items-center justify-center",
                selectedDeck?.uid === 'custom' && "outline"
              )}
              onClick={() => deckInputRef.current?.click()}
              title="Upload Custom Deck"
            >
              <span className="text-white text-xl leading-none">+</span>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={deckInputRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setDeck({ uid: 'custom', texture: url });
                }
              }}
            />
          </li>
        </Options> 
      <Options title="Wheels"> 
         {wheels.map((wheel) => (
          <Option
            key={wheel.uid}
            imageField={wheel.texture}
            imgixParams={{
              rect: [20, 10, 850, 850],
              width: 150,
              height: 150,
            }}
            selected={wheel.uid === selectedWheel?.uid}
            onClick={() => setWheel(wheel)}
          >
            {wheel.uid?.replace(/-/g, " ")}
          </Option>
        ))}
          <li className="relative flex items-center justify-center">
            <button
              className={clsx(
                "relative size-10 cursor-pointer rounded-full bg-zinc-800 p-0.5 outline-2 outline-white flex items-center justify-center",
                selectedWheel?.uid === 'custom' && "outline"
              )}
              onClick={() => wheelInputRef.current?.click()}
              title="Upload Custom Wheel"
            >
              <span className="text-white text-xl leading-none">+</span>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={wheelInputRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setWheel({ uid: 'custom', texture: url });
                }
              }}
            />
          </li>
      </Options>
      <Options title="Trucks">
            {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            selected={metal.uid === selectedTruck?.uid}
            onClick={() => setTruck(metal)}
          >
            {metal.uid?.replace(/-/g, " ")}
          </Option>
        ))}
          <li className="relative flex items-center justify-center">
            <div
              className={clsx(
                "relative size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white overflow-hidden flex items-center justify-center",
                selectedTruck?.uid === 'custom' && "outline"
              )}
              title="Custom Truck Color"
            >
              <input
                type="color"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                value={selectedTruck?.uid === 'custom' ? selectedTruck.color : "#000000"}
                onChange={(e) => {
                  setTruck({ uid: 'custom', color: e.target.value });
                }}
              />
              <div 
                className="h-full w-full rounded-full"
                style={{ background: selectedTruck?.uid === 'custom' ? selectedTruck.color : 'conic-gradient(red, yellow, green, cyan, blue, magenta, red)' }}
              />
            </div>
          </li>
         </Options>
      <Options title="Bolts"> 

          {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            selected={metal.uid === selectedBolt?.uid}
            onClick={() => setBolt(metal)}
          >
            {metal.uid?.replace(/-/g, " ")}
          </Option>
        ))}
          <li className="relative flex items-center justify-center">
            <div
              className={clsx(
                "relative size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white overflow-hidden flex items-center justify-center",
                selectedBolt?.uid === 'custom' && "outline"
              )}
              title="Custom Bolt Color"
            >
              <input
                type="color"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                value={selectedBolt?.uid === 'custom' ? selectedBolt.color : "#000000"}
                onChange={(e) => {
                  setBolt({ uid: 'custom', color: e.target.value });
                }}
              />
              <div 
                className="h-full w-full rounded-full"
                style={{ background: selectedBolt?.uid === 'custom' ? selectedBolt.color : 'conic-gradient(red, yellow, green, cyan, blue, magenta, red)' }}
              />
            </div>
          </li>
      </Options>
    </div>
  );
};

export default Controls;

function Options({ title, selectedName, children }) {
  const formattedName = selectedName?.replace(/-/g, " ");

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          {title}
        </h2>
        {formattedName && (
          <p className="text-xs font-mono text-zinc-400 uppercase">
            {formattedName}
          </p>
        )}
      </div>
      <ul className="flex flex-wrap gap-3">{children}</ul>
    </div>
  );
}

function Option({
  children,
  selected,
  imageField,
  imgixParams,
  colorField,
  onClick,
}) {
  return (
    <li>
      <button
        className={clsx(
          "relative size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white",
          selected && "outline"
        )}
        onClick={onClick}
      >
        {imageField ? (
          <Image
            src={imageField}
            fill
            className="pointer-events-none rounded-full object-cover p-0.5"
            alt=""
          />
        ) : (
          <div
            className="h-full w-full rounded-full"
            style={{ backgroundColor: colorField ?? undefined }}
          />
        )}

        <span className="sr-only">{children}</span>
      </button>
    </li>
  );
}