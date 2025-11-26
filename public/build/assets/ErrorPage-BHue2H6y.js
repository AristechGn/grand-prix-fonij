import{r as v,j as e,W as d}from"./app-iOletHGK.js";import{M as f}from"./MainLayout-z50p9Jdh.js";import{m as t}from"./proxy-0MHNHxGD.js";import{c as b}from"./createLucideIcon-DtpILd9e.js";import"./index-BULwtsFH.js";import"./x-BRazAujK.js";import"./trophy-BbTeHUsF.js";import"./house-Ml8hmcuN.js";import"./calendar-days-B4GWO29n.js";import"./graduation-cap-BZ4HI-gb.js";import"./info-C3mvUPbB.js";import"./phone-BXGVekmg.js";import"./map-pin-D54EYJju.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],y=b("TriangleAlert",g);function T({status:i=500}){const r={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.6}}},n={hidden:{opacity:0},visible:{opacity:1,transition:{duration:.8}}},u={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.1,delayChildren:.2}}},o={hidden:{opacity:0,y:20},visible:{opacity:1,y:0,transition:{duration:.5,delay:.6}},hover:{scale:1.05,y:-5,boxShadow:"0 10px 25px -5px rgba(0, 0, 0, 0.1)",transition:{type:"spring",stiffness:400,damping:10}},tap:{scale:.98}},m={scale:[1,1.05,1],opacity:[.8,1,.8],transition:{duration:2,repeat:1/0,repeatType:"mirror",ease:"easeInOut"}};v.useEffect(()=>{const h=setInterval(()=>{const l=document.getElementById("particles-container");if(!l)return;const c=Math.random()*15+5,a=document.createElement("div");a.className="particle",a.style.width=`${c}px`,a.style.height=`${c}px`,a.style.left=`${Math.random()*100}%`,a.style.top=`${Math.random()*100}%`,a.style.opacity=`${Math.random()*.5}`,a.style.background=`rgba(255, 255, 255, ${Math.random()*.3})`,l.appendChild(a),setTimeout(()=>{a.remove()},5e3)},500);return()=>clearInterval(h)},[]);const p=s=>{switch(s){case 400:return"Requête incorrecte";case 401:return"Non autorisé";case 403:return"Accès interdit";case 404:return"Page non trouvée";case 405:return"Méthode non autorisée";case 408:return"Délai d'attente dépassé";case 419:return"Session expirée";case 422:return"Entité non traitable";case 429:return"Trop de requêtes";case 500:return"Erreur interne du serveur";case 502:return"Passerelle incorrecte";case 503:return"Service indisponible";case 504:return"Délai de passerelle dépassé";default:return"Une erreur s'est produite"}},x=s=>{switch(s){case 400:return"Le serveur ne peut pas traiter votre demande en raison d'une erreur client.";case 401:return"Vous devez vous authentifier pour accéder à cette ressource.";case 403:return"Vous n'avez pas les autorisations nécessaires pour accéder à cette page.";case 404:return"La page que vous recherchez n'existe pas ou a été déplacée.";case 405:return"La méthode de requête utilisée n'est pas prise en charge pour cette URL.";case 408:return"Le serveur a mis fin à la connexion car la requête a pris trop de temps.";case 419:return"Votre session a expiré ou votre jeton CSRF est invalide. Veuillez actualiser la page.";case 422:return"Les données soumises ne sont pas valides. Veuillez vérifier vos informations.";case 429:return"Vous avez effectué trop de requêtes. Veuillez réessayer plus tard.";case 500:return"Nous rencontrons des difficultés techniques. Veuillez réessayer ultérieurement.";case 502:return"Le serveur a reçu une réponse invalide du serveur en amont.";case 503:return"Le service est actuellement indisponible. Merci de réessayer ultérieurement.";case 504:return"Le serveur n'a pas reçu de réponse à temps du serveur en amont.";default:return"Une erreur inattendue s'est produite. Veuillez réessayer ou contacter l'administrateur."}};return e.jsxs(f,{children:[e.jsxs(t.div,{className:"relative w-full bg-primary overflow-hidden min-h-[85vh]",initial:"hidden",animate:"visible",variants:n,children:[e.jsx("div",{className:"absolute inset-0 bg-black/30 z-10"}),e.jsx("div",{className:"absolute inset-0 bg-[url('/images/fonij/cover_3.png')] bg-cover bg-center bg-no-repeat opacity-10"}),e.jsx("div",{className:"absolute inset-0 bg-[url('/images/fonij/cover_3.png')] bg-cover bg-center bg-no-repeat opacity-10"}),e.jsx("div",{className:"absolute inset-0 bg-[url('/images/fonij/cover_3.png')] bg-cover bg-center bg-no-repeat opacity-10"}),e.jsxs("div",{className:"absolute inset-0 z-10 overflow-hidden",children:[e.jsx(t.div,{className:"absolute top-1/4 left-5 w-12 h-12 sm:w-20 sm:h-20 md:w-40 md:h-40 rounded-full bg-primary/30 blur-xl",variants:n,animate:{x:[0,10,0],y:[0,-15,0],scale:[1,1.05,1],opacity:[.3,.5,.3]},transition:{duration:8,repeat:1/0,ease:"easeInOut"}}),e.jsx(t.div,{className:"absolute bottom-1/4 right-5 w-10 h-10 sm:w-16 sm:h-16 md:w-32 md:h-32 rounded-full bg-amber-500/20 blur-xl",variants:n,animate:{x:[0,-10,0],y:[0,10,0],scale:[1,1.1,1],opacity:[.2,.4,.2]},transition:{duration:6,repeat:1/0,ease:"easeInOut",delay:1}})]}),e.jsx("div",{id:"particles-container",className:"absolute inset-0 z-10 overflow-hidden pointer-events-none"}),e.jsx(t.div,{className:"absolute inset-0 z-20 flex flex-col justify-center items-center text-white px-4 md:px-12",variants:u,children:e.jsxs("div",{className:"max-w-4xl text-center",children:[e.jsx(t.div,{className:"mb-6 sm:mb-8 inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-amber-500/50 backdrop-blur-sm",variants:r,children:e.jsx(t.div,{animate:m,children:e.jsx(y,{className:"h-12 w-12 sm:h-16 sm:w-16 text-white",strokeWidth:1.5})})}),e.jsx(t.h1,{className:"text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 text-shadow-lg drop-shadow-2xl",variants:r,children:i}),e.jsx(t.h2,{className:"text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-shadow-sm drop-shadow-lg",variants:r,children:p(i)}),e.jsx(t.p,{className:"text-base sm:text-lg md:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto text-shadow-sm drop-shadow-lg",variants:r,children:x(i)}),e.jsxs(t.div,{className:"flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center",variants:r,children:[e.jsx(t.div,{variants:o,whileHover:"hover",whileTap:"tap",children:e.jsx(d,{href:"/",className:"bg-primary hover:bg-primary-dark text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transform transition-all duration-300 shadow-lg hover:shadow-xl block w-full sm:w-auto",children:"Retour à l'accueil"})}),e.jsx(t.div,{variants:o,whileHover:"hover",whileTap:"tap",children:e.jsx(d,{href:route("contact"),className:"bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transform transition-all duration-300 block w-full sm:w-auto",children:"Nous contacter"})})]})]})}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 z-10",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1440 120",className:"w-full",children:e.jsx("path",{fill:"#ffffff",fillOpacity:"1",d:"M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,64C672,53,768,75,864,85.3C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"})})})]}),e.jsx("style",{children:`
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
                `})]})}export{T as default};
