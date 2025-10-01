import{r as c,j as t,W as l}from"./app-D-cgBubj.js";import{M as x}from"./MainLayout-B0rK_B5P.js";import{m as e}from"./proxy-DuoYsGnB.js";import{c as p}from"./createLucideIcon-DmEstM7T.js";import"./index-CZy3mj3Z.js";import"./x-Dsp97jpj.js";import"./trophy-Dm6SDrdY.js";import"./house-BgzyuAuz.js";import"./calendar-days-D-kPhMIe.js";import"./graduation-cap-CSPWfGCC.js";import"./phone-CGEr9te9.js";import"./map-pin-DxDJAhi-.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]],f=p("UserX",h);function L(){const s={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.6}}},i={hidden:{opacity:0},visible:{opacity:1,transition:{duration:.8}}},d={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.1,delayChildren:.2}}},r={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.5,delay:.6}},hover:{scale:1.05,y:-5,boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.1)",transition:{type:"spring",stiffness:400,damping:10}},tap:{scale:.98}};return c.useEffect(()=>{const m=setInterval(()=>{const o=document.getElementById("particles-container");if(!o)return;const n=Math.random()*15+5,a=document.createElement("div");a.className="particle",a.style.width=`${n}px`,a.style.height=`${n}px`,a.style.left=`${Math.random()*100}%`,a.style.top=`${Math.random()*100}%`,a.style.opacity=`${Math.random()*.5}`,a.style.background=`rgba(255, 255, 255, ${Math.random()*.3})`,o.appendChild(a),setTimeout(()=>{a.remove()},5e3)},500);return()=>clearInterval(m)},[]),t.jsxs(x,{children:[t.jsxs(e.div,{className:"relative w-full bg-primary overflow-hidden min-h-[85vh]",initial:"hidden",animate:"visible",variants:i,children:[t.jsx("div",{className:"absolute inset-0 bg-black/30 z-10"}),t.jsx("div",{className:"absolute inset-0 bg-[url('/images/fonij/cover_3.png')] bg-cover bg-center bg-no-repeat opacity-10"}),t.jsxs("div",{className:"absolute inset-0 z-10 overflow-hidden",children:[t.jsx(e.div,{className:"absolute top-1/4 left-5 w-12 h-12 sm:w-20 sm:h-20 md:w-40 md:h-40 rounded-full bg-primary/30 blur-xl",variants:i,animate:{x:[0,10,0],y:[0,-15,0],scale:[1,1.05,1],opacity:[.3,.5,.3]},transition:{duration:8,repeat:1/0,ease:"easeInOut"}}),t.jsx(e.div,{className:"absolute bottom-1/4 right-5 w-10 h-10 sm:w-16 sm:h-16 md:w-32 md:h-32 rounded-full bg-orange-500/20 blur-xl",variants:i,animate:{x:[0,-10,0],y:[0,10,0],scale:[1,1.1,1],opacity:[.2,.4,.2]},transition:{duration:6,repeat:1/0,ease:"easeInOut",delay:1}})]}),t.jsx("div",{id:"particles-container",className:"absolute inset-0 z-10 overflow-hidden pointer-events-none"}),t.jsx(e.div,{className:"absolute inset-0 z-20 flex flex-col justify-center items-center text-white px-4 md:px-12",variants:d,children:t.jsxs("div",{className:"max-w-4xl text-center",children:[t.jsx(e.div,{className:"mb-6 sm:mb-8 inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-orange-500/50 backdrop-blur-sm",variants:s,children:t.jsx(f,{className:"h-12 w-12 sm:h-16 sm:w-16 text-white",strokeWidth:1.5})}),t.jsx(e.h1,{className:"text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 text-shadow-lg drop-shadow-2xl",variants:s,children:"401"}),t.jsx(e.h2,{className:"text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-shadow-sm drop-shadow-lg",variants:s,children:"Non Autorisé"}),t.jsx(e.p,{className:"text-base sm:text-lg md:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto text-shadow-sm drop-shadow-lg",variants:s,children:"Vous devez vous authentifier pour accéder à cette ressource."}),t.jsxs(e.div,{className:"flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center",variants:s,children:[t.jsx(e.div,{variants:r,whileHover:"hover",whileTap:"tap",children:t.jsx(l,{href:route("login"),className:"bg-primary hover:bg-primary-dark text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transform transition-all duration-300 shadow-lg hover:shadow-xl block w-full sm:w-auto",children:"Se connecter"})}),t.jsx(e.div,{variants:r,whileHover:"hover",whileTap:"tap",children:t.jsx(l,{href:"/",className:"bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transform transition-all duration-300 block w-full sm:w-auto",children:"Retour à l'accueil"})})]})]})}),t.jsx("div",{className:"absolute bottom-0 left-0 right-0 z-10",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 120",className:"w-full",children:t.jsx("path",{fill:"#ffffff",fillOpacity:"1",d:"M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,64C672,53,768,75,864,85.3C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"})})})]}),t.jsx("style",{children:`
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                .animate-fadeIn {
                    animation: fadeIn 1.2s ease-out forwards;
                }

                .animation-delay-300 {
                    animation-delay: 300ms;
                }

                .text-shadow-sm {
                    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
                }

                .text-shadow-lg {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.6);
                }

                .particle {
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: 0;
                    animation: floatParticle 5s ease-in-out forwards;
                }

                @keyframes floatParticle {
                    0% {
                        opacity: 0;
                        transform: translateY(0) translateX(0) rotate(0deg);
                    }
                    20% {
                        opacity: 0.3;
                    }
                    80% {
                        opacity: 0.2;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100px) translateX(20px) rotate(360deg);
                    }
                }
                `})]})}export{L as default};
