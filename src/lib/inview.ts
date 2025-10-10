// place files you want to import through the `$lib` alias in this folder.
export function inview(node: HTMLElement, options: IntersectionObserverInit = { threshold: 0.3 }){
  const onEnter = () => node.classList.add('reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ onEnter(); io.unobserve(node);} });
  }, options);
  io.observe(node); return { destroy(){ io.disconnect(); } };
}