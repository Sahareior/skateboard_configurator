'use client'
import { useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import './Hero.css'
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
const router = useRouter()

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const tickerFunction = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tickerFunction);
    gsap.ticker.lagSmoothing(0);

    let ctx = gsap.context(() => {
      // Custom SplitText replacement
      const splitTextIntoWords = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return [];
        const text = element.textContent;

        element.innerHTML = text.split(' ').map(word => `<span class="word" style="display: inline-block; opacity: 0;">${word}</span>`).join(' ');
        return element.querySelectorAll('.word');
      };

      const heroWords = splitTextIntoWords(".hero-copy h3");
      let isHeroCopyHidden = false;

      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: `+${window.innerHeight * 3.5}px`,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Hero Header Animation
          const heroHeaderProgress = Math.min(progress / 0.29, 1);
          gsap.set(".hero-header", { yPercent: -heroHeaderProgress * 100 });

          // Hero Copy Words Animation
          const heroWordsProgress = Math.max(0, Math.min((progress - 0.29) / 0.21, 1));
          const totalWords = heroWords.length;

          heroWords.forEach((word, i) => {
            const wordStart = i / totalWords;
            const wordEnd = (i + 1) / totalWords;
            const wordOpacity = Math.max(0, Math.min((heroWordsProgress - wordStart) / (wordEnd - wordStart), 1));
            gsap.set(word, { opacity: wordOpacity });
          });

          // Hide/Show Hero Copy
          if (progress > 0.64 && !isHeroCopyHidden) {
            isHeroCopyHidden = true;
            gsap.to(".hero-copy h3", { opacity: 0, duration: 0.2 });
          } else if (progress <= 0.64 && isHeroCopyHidden) {
            isHeroCopyHidden = false;
            gsap.to(".hero-copy h3", { opacity: 1, duration: 0.2 });
          }

          // Hero Image Animation
          const heroImgProgress = Math.max(0, Math.min((progress - 0.71) / 0.29, 1));
          const heroImgWidth = gsap.utils.interpolate(window.innerWidth, 450, heroImgProgress);
          const heroImgHeight = gsap.utils.interpolate(window.innerHeight, 250, heroImgProgress);
          const heroImgBorderRadius = gsap.utils.interpolate(0, 10, heroImgProgress);

          gsap.set(".hero-img", {
            width: heroImgWidth,
            height: heroImgHeight,
            borderRadius: heroImgBorderRadius,
          });
        },
      });

      const aboutImgCols = [
        { id: "#about-images-col-1", y: -500 },
        { id: "#about-images-col-2", y: -250 },
        { id: "#about-images-col-3", y: -250 },
        { id: "#about-images-col-4", y: -500 },
      ];

      aboutImgCols.forEach(({ id, y }) => {
        gsap.to(id, {
          y,
          scrollTrigger: {
            trigger: ".about",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFunction);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section className="hero">
<div className="hero-img">

<video className='w-full h-full' autoPlay loop muted  src="https://media.istockphoto.com/id/1287294363/video/cool-modern-millennial-skater-do-skateboard-trick.mp4?s=mp4-640x640-is&k=20&c=10QlKkk61A2MbotWF8Euryoq3B6rAXtWp0uH9V-ymcA="></video>

      {/* <img
        src="https://images.unsplash.com/photo-1602478095301-aadaa50af0ae?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="" /> */}
</div>

<div className="hero-header">
<h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-white drop-shadow-xl">The Demo Header</h1>
</div>

<div className='hero-copy'>
  <h3 className="text-2xl md:text-4xl font-light leading-relaxed tracking-wide text-gray-200">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, doloribus vero?</h3>
</div>
</section>

<section className="about">
<div className="about-image">
  <div className="about-images-col" id="about-images-col-1">
    <div className="img">
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
        alt="Mountain landscape" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
        alt="Forest landscape" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
        alt="Sunlight through trees" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=800&q=80"
        alt="Night sky stars" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80"
        alt="Desert landscape" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
        alt="Foggy forest" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1777948052388-c8304b47ca77?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Northern lights" />
    </div>
  </div>

  <div className="about-images-col" id="about-images-col-2">
    <div className="img">
      <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"
        alt="Waterfall" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80"
        alt="Ocean waves" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80"
        alt="Canyon view" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80"
        alt="Waterfall stream" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
        alt="Forest stream" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=800&q=80"
        alt="Sunset beach" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80"
        alt="Mountain lake" />
    </div>
  </div>

  <div className="about-images-col" id="about-images-col-3">
    <div className="img">
      <img src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80"
        alt="Country road" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80"
        alt="Autumn forest" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=800&q=80"
        alt="Valley sunrise" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80"
        alt="Lake view" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80"
        alt="Misty mountains" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80"
        alt="Mountain peak sunset" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80"
        alt="Snowy mountain" />
    </div>
  </div>

  <div className="about-images-col" id="about-images-col-4">
    <div className="img">
      <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
        alt="Lake reflection" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        alt="Valley view" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80"
        alt="Forest path" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
        alt="Mountain peak" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1434725039720-abb26e22fed8?auto=format&fit=crop&w=800&q=80"
        alt="River stream" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80"
        alt="Green meadow" />
    </div>
    <div className="img">
      <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"
        alt="Mountain landscape" />
    </div>
  </div>
</div>

      <div className="about-header">
       {/* <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, officiis.</h1>  */}
    <button onClick={() => router.push('/builder')} className='border hover:border-red-500 p-2 rounded-2xl text-white hover:cursor-pointer'>Build Your Custom SkateBoard</button>
    </div>
</section>
 <section className="outro">outro</section>
    </>
  );
}
