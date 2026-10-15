(function(){
'use strict';
/* ═══════════ 1 · CMYK SEPARATION PLATE ═══════════
   The one procedural graphic left in the page: chapter 04 prints the
   same artwork four times, once per process ink.                      */

var INK = {c:'#00aeef', m:'#ec008c', y:'#ffe800', k:'#1a1a1a'};
var COV = {c:[.88,.14,.40,.55,.18], m:[.20,.86,.52,.30,.22],
           y:[.58,.32,.90,.16,.12], k:[.10,.13,.18,.09,1]};
var uidN = 0;

function sepPlate(tint){
  var ink = INK[tint], C = COV[tint], id = 'sep' + (++uidN), i, b = '';
  b += '<circle cx="166" cy="214" r="126" fill="' + ink + '" opacity="' + C[0] + '"/>';
  b += '<path d="M250 78 L368 268 L236 340 Z" fill="' + ink + '" opacity="' + C[1] + '"/>';
  b += '<rect x="0" y="428" width="400" height="48" fill="' + ink + '" opacity="' + C[2] + '"/>';
  b += '<rect x="42" y="332" width="206" height="82" fill="url(#' + id + ')" opacity="' + C[3] + '"/>';
  for (i = 0; i < 6; i++)
    b += '<rect x="42" y="' + (38 + i * 13) + '" width="' + (58 + i * 27) + '" height="4" fill="' + ink + '" opacity="' + C[4] + '"/>';
  b += '<circle cx="300" cy="410" r="42" fill="none" stroke="' + ink + '" stroke-width="7" opacity="' + C[1] + '"/>';
  return '<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">'
       + '<defs><pattern id="' + id + '" width="7" height="7" patternUnits="userSpaceOnUse">'
       + '<circle cx="3.5" cy="3.5" r="1.7" fill="' + ink + '"/></pattern></defs>' + b + '</svg>';
}

/* Real plates. Two sizes per asset, native lazy-loading below the fold,
   width/height carried so nothing reflows when a plate lands.          */
var ASSET='assets/';
var XS={};
function realPlate(slug,eager,fit,small){
  var set,sz;
  if(small&&XS[slug]){
    set=ASSET+slug+'-xs.webp 430w, '+ASSET+slug+'-sm.webp 760w';
    sz='(max-width:640px) 44vw, (max-width:1000px) 22vw, 17vw';
  }else{
    set=ASSET+slug+'-sm.webp 760w, '+ASSET+slug+'-lg.webp 1500w';
    sz='(max-width:640px) 92vw, (max-width:1000px) 48vw, 34vw';
  }
  return '<img class="pimg'+(fit?' '+fit:'')+'" src="'+ASSET+slug+'-sm.webp"'
    +' srcset="'+set+'" sizes="'+sz+'"'
    +' loading="'+(eager?'eager':'lazy')+'"'+(eager?' fetchpriority="high"':'')
    +' decoding="async" alt="">';
}
/* every plate carries the true pixel ratio of the work it holds, so a
   container can take the shape of the image instead of cropping it. */
var AR=__AR_TABLE__;
XS=__XS_TABLE__;
document.querySelectorAll('[data-img]').forEach(function(el){
  var slug=el.dataset.img, ar=AR[slug];
  el.innerHTML=realPlate(slug,el.hasAttribute('data-eager'),el.dataset.fit,
                         el.dataset.size==='s'||!!el.closest('.tcard,.piece,.rcard'));
  el.classList.add('has-img');
  if(ar){
    el.style.setProperty('--ar',ar);
    var host=el.closest('[data-arhost]');
    if(host)host.style.setProperty('--ar',ar);
  }
});
document.querySelectorAll('[data-tint]').forEach(function(el){
  el.innerHTML=sepPlate(el.dataset.tint);
});

var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var ease=function(x){return 1-Math.pow(1-x,3);};
var cl=function(v,a,b){return v<a?a:v>b?b:v;};

/* ═══════════════════ 2 · TEXT REVEAL ═══════════════════
   Words rise out of a mask; display type wipes up; rules draw
   themselves. All of it is scroll position, not a timer.       */

function splitWords(el){
  var parts=[];
  (function walk(node){
    [].slice.call(node.childNodes).forEach(function(k){
      if(k.nodeType===3){
        var txt=k.nodeValue;
        if(!txt.replace(/\s/g,'').length)return;
        var frag=document.createDocumentFragment();
        txt.split(/(\s+)/).forEach(function(u){
          if(!u)return;
          if(/^\s+$/.test(u)){frag.appendChild(document.createTextNode(u));return;}
          if(/^[.,;:!?)\]\u2019\u201d\u00bb]+$/.test(u)&&parts.length){
            parts[parts.length-1].textContent+=u;return;   /* keep the comma with its word */
          }
          var w=document.createElement('span');w.className='w';
          var wi=document.createElement('span');wi.className='wi';wi.textContent=u;
          w.appendChild(wi);frag.appendChild(w);parts.push(wi);
        });
        node.replaceChild(frag,k);
      }else if(k.nodeType===1&&k.tagName!=='BR'&&!k.classList.contains('w')&&!k.classList.contains('nosplit')){
        walk(k);
      }
    });
  })(el);
  return parts;
}

function buildAnims(stage){
  return [].slice.call(stage.querySelectorAll('[data-anim]')).map(function(el){
    var mode=el.dataset.anim;
    if(mode==='chars')mode='mask';
    var split=(mode==='words'||mode==='flip'||mode==='blur');
    if(mode==='track')el.style.willChange='letter-spacing,opacity';
    return {el:el,mode:mode,parts:split?splitWords(el):null,seen:0,
            ls:mode==='track'?(parseFloat(getComputedStyle(el).letterSpacing)||0):0};
  });
}

/* One entry per reveal mode. Each gets the animation record and a 0-1
   drive; staggered modes walk a.parts, whole-element modes touch a.el.  */
var ANIM = {
  words: function(a, d){
    var step = Math.min(.028, .4 / Math.max(1, a.parts.length - 1));
    a.parts.forEach(function(p, i){
      var k = ease(cl((d - i * step) / .5, 0, 1));
      p.style.transform = 'translate3d(0,' + ((1 - k) * 108).toFixed(1) + '%,0)';
    });
  },
  rise: function(a, d){
    var k = ease(cl(d / .5, 0, 1));
    a.el.style.transform = 'translate3d(0,' + ((1 - k) * 15).toFixed(1) + 'px,0)';
    a.el.style.opacity = k.toFixed(3);
  },
  line: function(a, d){
    a.el.style.transform = 'scaleX(' + ease(cl(d / .55, 0, 1)).toFixed(3) + ')';
  },
  mask: function(a, d){
    var k = ease(cl(d / .62, 0, 1));
    a.el.style.clipPath = 'inset(-46px -52px ' + ((1 - k) * 100).toFixed(1) + '% -52px)';
    a.el.style.transform = 'translate3d(0,' + ((1 - k) * 12).toFixed(1) + 'px,0)';
  },
  /* the line draws itself in from the left, like a plotter pass */
  wipe: function(a, d){
    var k = ease(cl(d / .6, 0, 1));
    a.el.style.clipPath = 'inset(-30px ' + ((1 - k) * 100).toFixed(1) + '% -30px -30px)';
    a.el.style.transform = 'translate3d(' + ((1 - k) * -14).toFixed(1) + 'px,0,0)';
  },
  /* the tracking closes up as it arrives — a letterpress lock-up */
  track: function(a, d){
    var k = ease(cl(d / .66, 0, 1));
    a.el.style.letterSpacing = (a.ls + (1 - k) * 13).toFixed(2) + 'px';
    a.el.style.opacity = Math.min(1, k * 1.35).toFixed(3);
    a.el.style.transform = 'translate3d(0,' + ((1 - k) * 6).toFixed(1) + 'px,0)';
  },
  /* each word hinges up off its own baseline */
  flip: function(a, d){
    var step = Math.min(.05, .42 / Math.max(1, a.parts.length - 1));
    a.parts.forEach(function(p, i){
      var k = ease(cl((d - i * step) / .5, 0, 1));
      p.style.transform = 'perspective(620px) rotateX(' + ((1 - k) * -82).toFixed(1) + 'deg) translate3d(0,' + ((1 - k) * 38).toFixed(1) + '%,0)';
      p.style.opacity = Math.min(1, k * 1.6).toFixed(3);
      p.style.transformOrigin = '50% 100%';
    });
  },
  /* words resolve out of focus rather than sliding */
  blur: function(a, d){
    var step = Math.min(.04, .36 / Math.max(1, a.parts.length - 1));
    a.parts.forEach(function(p, i){
      var k = ease(cl((d - i * step) / .55, 0, 1));
      p.style.filter = 'blur(' + ((1 - k) * 9).toFixed(2) + 'px)';
      p.style.opacity = k.toFixed(3);
      p.style.transform = 'translate3d(0,' + ((1 - k) * 24).toFixed(1) + '%,0) scale(' + (1 + (1 - k) * .04).toFixed(3) + ')';
    });
  }
};

/* j is the element's index inside its chapter — later elements start later */
function applyAnim(a, j, drive){
  var fn = ANIM[a.mode];
  if(fn) fn(a, drive - Math.min(.44, j * .035));
}

/* ═══════════════════ 3 · SCROLL ENGINE ═══════════════════ */

var stages=[].slice.call(document.querySelectorAll('.stage'));
var PHONE=matchMedia('(max-width:1000px)').matches;
function setStageHeights(){
  stages.forEach(function(s){
    s.style.height = PHONE ? '' : (parseFloat(s.dataset.h)||220)+'vh';
  });
}
setStageHeights();

var M=[],docH=1,vh=innerHeight;
function measure(){
  vh=innerHeight;
  M=stages.map(function(s,idx){
    var veil=s.querySelector('.veil');
    if(veil)veil.style.background=(stages[idx-1]||s).dataset.bg||'#08080b';
    return {
      el:s,top:s.offsetTop,h:s.offsetHeight,first:idx===0,
      depth:s.querySelector('.depth'),
      fx:s.querySelector('.fx'),
      veil:veil,
      st:[].slice.call(s.querySelectorAll('[data-stagger]')),
      an:buildAnims(s),
      name:s.dataset.name,style:s.dataset.style,hud:s.dataset.hud,
      blend:s.dataset.blend||'normal',vig:parseFloat(s.dataset.vig||'.5')
    };
  });
  docH=Math.max(1,document.body.scrollHeight-vh);
}
measure();
addEventListener('resize',function(){
  var was=PHONE;
  PHONE=matchMedia('(max-width:1000px)').matches;
  vh=innerHeight;
  if(was!==PHONE){ setStageHeights(); measure(); return; }
  M.forEach(function(m){m.top=m.el.offsetTop;m.h=m.el.offsetHeight;});
  docH=Math.max(1,document.body.scrollHeight-vh);
});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){
  M.forEach(function(m){m.top=m.el.offsetTop;m.h=m.el.offsetHeight;});
  docH=Math.max(1,document.body.scrollHeight-vh);
});

var tunnel=document.getElementById('tunnel');
var cards=tunnel?[].slice.call(tunnel.children).map(function(c,ci){
  return {el:c,x:parseFloat(c.dataset.x),y:parseFloat(c.dataset.y),z:parseFloat(c.dataset.z),
          rot:(Math.random()*8-4),ph:ci*1.37+Math.random()*.9,dr:.34+ci%4*.07};
}):[];
var hglow=document.querySelector('#s-hero .hero-glow');
var htop=document.querySelector('#s-hero .hero-top');
var hbot=document.querySelector('#s-hero .hero-bot');

var mark=document.getElementById('heroMark');
var gcards=document.getElementById('gcards');
var gc=gcards?[].slice.call(gcards.children):[];
var glassfx=document.getElementById('glassfx');
var railfill=document.getElementById('railfill');
var hudName=document.getElementById('hudName');
var hudStyle=document.getElementById('hudStyle');
var hud=document.getElementById('hud');
var rail=document.getElementById('rail');
var vign=document.getElementById('vignette');

/* ── the mark, extruded ── */
var logo=document.getElementById('logo3d');
var extG=document.getElementById('ext'),extLayers=[],glare=null;
if(extG){
  var LAYERS=16;
  for(var q=LAYERS;q>=1;q--){
    var u=document.createElementNS('http://www.w3.org/2000/svg','use');
    u.setAttribute('href','#mMark');
    var t=q/LAYERS;
    u.setAttribute('fill','rgb('+Math.round(18+30*(1-t))+','+Math.round(10+18*(1-t))+','+Math.round(5+8*(1-t))+')');
    extG.appendChild(u);
    extLayers.push({el:u,i:q});
  }
  glare=logo.querySelector('.glare');
}

var sy=scrollY,ly=sy,vel=0,mx=0,my=0,tmx=0,tmy=0,active=-1,t0=performance.now();

addEventListener('pointermove',function(e){
  tmx=(e.clientX/innerWidth-.5)*2;
  tmy=(e.clientY/innerHeight-.5)*2;
},{passive:true});

function frame(){
  var now=performance.now();
  var ht=now*0.001;

  /* ── phone: the page is a document, so every reveal is driven by the
     element's own position on screen and only ever plays forward ── */
  if(PHONE){
    var vb=innerHeight, pick=-1, j, q3, s3;
    for(j=0;j<M.length;j++){
      var mm=M[j], r=mm.el.getBoundingClientRect();
      if(r.bottom<-160||r.top>vb+160) continue;
      if(r.top<=vb*.45 && r.bottom>=vb*.45) pick=j;
      for(q3=0;q3<mm.an.length;q3++){
        var an=mm.an[q3];
        var d=reduce?1:cl((vb*.88-an.el.getBoundingClientRect().top)/(vb*.4),0,1);
        if(d>an.seen){ an.seen=d; applyAnim(an,0,d); }
      }
      for(s3=0;s3<mm.st.length;s3++){
        var stl=mm.st[s3];
        var sk=reduce?1:ease(cl((vb*.9-stl.getBoundingClientRect().top)/(vb*.42),0,1));
        stl.style.transform='translate3d(0,'+((1-sk)*20).toFixed(1)+'px,0)';
        stl.style.opacity=(0.2+sk*0.8).toFixed(3);
      }
    }
    if(pick>=0&&pick!==active){
      active=pick;
      var pm=M[pick];
      if(hudName)hudName.textContent=pm.name||'';
      if(hudStyle)hudStyle.textContent=pm.style||'';
      if(hud)hud.style.setProperty('--hud',pm.hud||'#f2ece1');
    }
    if(railfill)railfill.style.height=(cl(scrollY/Math.max(1,document.body.scrollHeight-vb),0,1)*100).toFixed(2)+'%';
    trailTick();
    requestAnimationFrame(frame);
    return;
  }

  var loadK=reduce?1:cl((now-t0-140)/900,0,1);
  sy=scrollY;
  var prev=ly;
  ly+=(sy-ly)*(reduce?1:.16);
  vel=cl((ly-prev)*.5,-9,9);
  mx+=(tmx-mx)*.07;my+=(tmy-my)*.07;

  var best=-1,bestD=1e9;

  for(var i=0;i<M.length;i++){
    var m=M[i];
    var start=m.top-vh,span=m.h+vh;
    var p=cl((ly-start)/span,0,1);
    var a=vh/span;
    var e=cl(p/a,0,1),x=cl((p-(1-a))/a,0,1);
    var hold=cl((p-a)/(1-2*a),0,1);

    if(!((ly+vh>m.top-40)&&(ly<m.top+m.h+40)))continue;

    var d=Math.abs(p-.5);
    if(p>0&&p<1&&d<bestD){bestD=d;best=i;}

    if(m.depth&&!reduce){
      var ee=ease(e),xx=ease(x),xs=xx*xx*(3-2*xx);
      var z=-760*(1-ee)+300*xs;
      var ty=52*(1-ee)-30*xs;
      var rx=8.5*(1-ee)-4.6*xs;
      var sc=1-xs*.045;
      var op=Math.min(1,e*1.5)*(1-xs*.96);
      var bl=xs*5.2;
      m.depth.style.transform='translate3d(0,'+ty.toFixed(2)+'px,'+z.toFixed(1)+'px) rotateX('+rx.toFixed(2)+'deg) scale('+sc.toFixed(4)+')';
      m.depth.style.opacity=op.toFixed(3);
      m.depth.style.filter=bl>.08?'blur('+bl.toFixed(2)+'px)':'none';
    }
    /* the chapter arrives wearing the previous chapter's colour,
       so the seam between two pinned panels never reads as a cut */
    if(m.veil&&!reduce&&!m.first){
      var vo=1-ease(cl((p-a*.42)/(a*.95),0,1));
      m.veil.style.opacity=vo.toFixed(3);
    }
    if(m.fx&&!reduce){
      m.fx.style.transform='scale('+(1.02+hold*.07).toFixed(4)+') translate3d(0,'+((hold-.5)*-26).toFixed(1)+'px,0)';
    }

    var drive=cl((p-a*.14)/(a*1.2),0,1);
    if(m.first)drive=Math.min(drive,loadK);
    /* the exit is the entrance played backwards, a touch quicker, so a
       chapter recedes rather than snapping off at the fade */
    var out=ease(cl((x-.12)/.62,0,1));
    if(out>0)drive=Math.min(drive,1-out);
    if(!reduce)for(var q2=0;q2<m.an.length;q2++)applyAnim(m.an[q2],q2,drive);

    for(var s2=0;s2<m.st.length;s2++){
      var kk=cl((e-s2*.035)/.6,0,1),ke=ease(kk);
      m.st[s2].style.transform='translate3d(0,'+((1-ke)*26).toFixed(1)+'px,0)';
      m.st[s2].style.opacity=(0.15+ke*0.85).toFixed(3);
    }

    /* hero depth tunnel */
    if(m.el.id==='s-hero'&&!reduce){
      var SP=5600;
      for(var c=0;c<cards.length;c++){
        var cd=cards[c],zz=cd.z+p*5400;
        zz=((zz-300)%SP+SP)%SP+300-SP;
        var fade=cl((zz+5300)/1400,0,1)*(1-cl((zz+420)/700,0,1));
        /* every card keeps breathing on its own clock, so the tunnel is
           never dead still even when the page is not moving */
        var ph=cd.ph, dr=cd.dr;
        var fx=Math.sin(ht*dr+ph)*11 + Math.sin(ht*dr*.61+ph*1.7)*5;
        var fy=Math.cos(ht*dr*.83+ph*1.3)*13 + Math.sin(ht*dr*.47+ph)*4;
        var fz=Math.sin(ht*dr*.52+ph*2.1)*46;
        var fr=Math.sin(ht*dr*.44+ph*.8)*1.5;
        var px=cd.x/100*innerWidth+mx*34*(1+zz/5600)+fx;
        var py=cd.y/100*innerHeight+my*26+fy;
        cd.el.style.transform='translate(-50%,-50%) translate3d('+px.toFixed(1)+'px,'+py.toFixed(1)+'px,'+(zz+fz).toFixed(0)+'px) rotate('+(cd.rot+fr).toFixed(2)+'deg)';
        cd.el.style.opacity=(fade*loadK).toFixed(3);
      }
      if(mark){
        /* the wordmark drifts a hair and the red plate breathes behind it */
        var mfy=Math.sin(ht*.55)*3.1+Math.sin(ht*.31+1.4)*1.6;
        var mfx=Math.sin(ht*.37+.8)*2.4;
        mark.style.transform='translate3d('+(mx*-16+mfx).toFixed(1)+'px,'+(my*-10+mfy).toFixed(1)+'px,0)';
        var l1=mark.querySelector('.l1');
        if(l1)l1.style.setProperty('--ab',(-3.4+vel*1.1+Math.sin(ht*.72)*.9).toFixed(2)+'px');
      }
      if(hglow)hglow.style.transform='translate(-50%,-50%) scale('+(1+Math.sin(ht*.33)*.045).toFixed(4)+')';
      if(htop)htop.style.transform='translate3d(0,'+(Math.sin(ht*.42+.6)*2.2).toFixed(2)+'px,0)';
      if(hbot)hbot.style.transform='translate3d(0,'+(Math.sin(ht*.38+2.1)*-2.6).toFixed(2)+'px,0)';
    }
    /* glass: cards move, the frosted surface never rotates or scales —
       rotating a backdrop-filter pane is what made them shimmer and tear.
       So: staggered rise, per-card scroll parallax, an idle float, a light
       sweep that follows the cursor, and the plate inside moving on its own. */
    if(m.el.id==='s-glass'&&!reduce){
      var tt3=(now-t0)/1000;
      for(var g2=0;g2<gc.length;g2++){
        var card=gc[g2];
        var t2=ease(cl(hold*2.05-g2*.11,0,1));
        var par=(hold-.5)*(16+g2*11);
        var flt=Math.sin(tt3*.72+g2*1.25)*4.4;
        var cx=((g2+.5)/gc.length)*2-1;
        var prox=Math.max(0,1-Math.abs(mx-cx)*1.55);
        var gy=(1-t2)*58-par+flt-prox*9;
        card.style.transform='translate3d(0,'+gy.toFixed(2)+'px,0)';
        card.style.opacity=(.06+t2*.94).toFixed(3);
        card.style.setProperty('--sheen',(-58+(mx+1)*.5*206+Math.sin(tt3*.5+g2*.95)*24+prox*18).toFixed(1)+'%');
        card.style.borderColor='rgba(255,255,255,'+(.2+prox*.22).toFixed(3)+')';
        var gp=card.querySelector('.ph');
        if(gp)gp.style.transform='translate3d('+(mx*7-cx*4).toFixed(1)+'px,'+((hold-.5)*-13+flt*.55).toFixed(1)+'px,0) scale('+(1.02+prox*.03).toFixed(3)+')';
      }
      if(glassfx)glassfx.style.transform='translate3d('+(mx*-26).toFixed(1)+'px,'+(my*-18).toFixed(1)+'px,0) scale(1.08)';
    }
    /* contact: the mark drifts, catches light, never spins */
    if(m.el.id==='s-contact'&&logo&&!reduce){
      var tt=(now-t0)/1000;
      var ry=Math.sin(tt*.42)*13+mx*7;
      var rxx=Math.sin(tt*.31+1.1)*5.5-my*4;
      var lift=(1-ease(cl(hold*2.2,0,1)))*26;
      logo.style.transform='translate3d(0,'+lift.toFixed(1)+'px,0) perspective(1100px) rotateY('+ry.toFixed(2)+'deg) rotateX('+rxx.toFixed(2)+'deg)';
      logo.style.opacity=cl(hold*2.6,0,1).toFixed(3);
      var rad=ry*Math.PI/180;
      var dx=-Math.sin(rad)*3.1,dy=2.5+Math.sin(rxx*Math.PI/180)*1.4;
      for(var L=0;L<extLayers.length;L++){
        var lay=extLayers[L];
        lay.el.setAttribute('transform','translate('+(dx*lay.i).toFixed(2)+','+(dy*lay.i).toFixed(2)+')');
      }
      if(glare)glare.setAttribute('transform','rotate(-18 500 500) translate('+(700+Math.sin(tt*.42)*260+ry*16).toFixed(0)+',0)');
    }
  }

  if(best>-1&&best!==active){
    active=best;
    var mm=M[best];
    hudName.textContent=mm.name;
    hudStyle.textContent=mm.style;
    hud.style.setProperty('--hud',mm.hud);
    hud.style.setProperty('--hudblend',mm.blend);
    rail.style.setProperty('--hud',mm.hud);
    rail.style.setProperty('--hudblend',mm.blend);
    vign.style.setProperty('--vig',mm.vig);
  }
  railfill.style.height=(cl(ly/docH,0,1)*100).toFixed(2)+'%';

  trailTick();
  requestAnimationFrame(frame);
}

/* ═══════════════════ 4 · CURSOR PLATE TRAIL (ch. 08) ═══════════════════ */

var trail=document.getElementById('trail');
var pool=[],poolN=18,cursor=0,lastX=null,lastY=null,lastMove=0,auto=0;
if(trail){
  var list=(trail.dataset.imgs||'').split(',').filter(Boolean);
  poolN=Math.max(12,list.length);
  for(var t=0;t<poolN;t++){
    var el=document.createElement('div'), ts=list[t%list.length];
    el.className='tplate';
    el.innerHTML='<img src="'+ASSET+ts+(XS[ts]?'-xs':'-sm')+'.webp" loading="lazy" decoding="async" alt="">';
    trail.appendChild(el);
    pool.push(el);
  }
  addEventListener('pointermove',function(e){lastMove=performance.now();spawn(e.clientX,e.clientY);},{passive:true});
  addEventListener('touchmove',function(e){var p=e.touches[0];if(p){lastMove=performance.now();spawn(p.clientX,p.clientY);}},{passive:true});
}

/* ── phone: two chapters were written for a pointer, so give them a
   form that works without one — a moving strip, and a printed spread ── */
(function(){
  if(!matchMedia('(max-width:1000px)').matches) return;
  var tn=document.getElementById('tunnel');
  if(tn && !reduce){
    [].slice.call(tn.children).forEach(function(c){ tn.appendChild(c.cloneNode(true)); });
    tn.classList.add('marq');
  }
  if(trail) trail.classList.add('spread');
})();

function trailActive(){
  if(!trail)return false;
  var st=document.getElementById('s-riso'),rect=st.getBoundingClientRect();
  return rect.top<vh*.6&&rect.bottom>vh*.6;
}

function spawn(cx,cy){
  if(!trailActive()||reduce||trail.classList.contains('spread'))return;
  var r=trail.getBoundingClientRect();
  var x=cx-r.left,y=cy-r.top;
  if(x<0||y<0||x>r.width||y>r.height)return;
  if(lastX!==null){
    var dx=x-lastX,dy=y-lastY;
    if(dx*dx+dy*dy<9600)return;   /* fewer, further apart: no pile-up */
  }
  lastX=x;lastY=y;
  var el=pool[cursor++%poolN];
  var rot=(Math.random()*13-6.5).toFixed(1);
  el.style.left=x+'px';el.style.top=y+'px';
  el.style.zIndex=String(100+(cursor%50));
  el.getAnimations().forEach(function(a){a.cancel();});
  el.animate([
    {opacity:0,transform:'translate(-50%,-50%) scale(.86) rotate('+rot+'deg)'},
    {opacity:1,transform:'translate(-50%,-50%) scale(1) rotate('+rot+'deg)',offset:.12},
    {opacity:.94,transform:'translate(-50%,-50%) scale(1.012) rotate('+rot+'deg)',offset:.55},
    {opacity:0,transform:'translate(-50%,-53%) scale(1.05) rotate('+rot+'deg)'}
  ],{duration:760,easing:'cubic-bezier(.22,.9,.28,1)',fill:'forwards'});
}

function trailTick(){
  if(!trail||reduce||trail.classList.contains('spread')||!trailActive())return;
  if(performance.now()-lastMove<1500)return;
  auto+=0.021;
  var r=trail.getBoundingClientRect();
  spawn(r.left+r.width*(.5+.34*Math.sin(auto*.9)),
        r.top+r.height*(.5+.26*Math.sin(auto*1.37+1.1)));
}

/* ═══════════════ 6 · MOTION CHAPTER ═══════════════
   Reels only fetch and run while the chapter is on screen. Nothing
   downloads until you get there, nothing decodes once you leave.   */
(function(){
  var reels=[].slice.call(document.querySelectorAll('.gate video'));
  if(!reels.length)return;
  var touch=matchMedia('(pointer:coarse)').matches||matchMedia('(max-width:1000px)').matches;

  /* A phone can refuse autoplay outright — Low Power Mode and reduced
     motion both do it — so on touch the reels always carry controls and
     the visitor can start them by hand. */
  if(reduce||touch) reels.forEach(function(v){
    v.controls=true; v.preload='metadata'; v.loop=!reduce;
  });
  if(reduce) return;

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      var v=en.target;
      if(en.isIntersecting){
        if(v.preload!=='auto'){v.preload='auto';v.load();}
        var pr=v.play();
        if(pr&&pr.catch)pr.catch(function(){ v.controls=true; });
      }else if(!v.paused){v.pause();}
    });
  },{rootMargin:'12% 0px',threshold:.15});
  reels.forEach(function(v){io.observe(v);});
})();

requestAnimationFrame(frame);
})();

/* ═══════════ 02 · THE BENTO TRAY ═══════════
   The compartments are cut to the true ratio of the work each one holds,
   so the tray fills exactly and nothing is cropped. How many rows the
   tray breaks into is solved for the space available, and the same
   measurement draws the tray's construction geometry over it.        */
/* ── shared measure: a plate's true ratio, and who is on screen ── */
function shown(el){ return getComputedStyle(el).display !== 'none'; }
function kids(el){
  return [].slice.call(el.children).filter(function(c){
    return c.nodeType === 1 && shown(c);
  });
}
function ratio(el){
  if(el.classList.contains('bstack')){          /* a stacked pair reads as one box */
    var inv = 0;
    kids(el).forEach(function(k){ inv += 1 / ratio(k); });
    return inv ? 1 / inv : 1;
  }
  return parseFloat(getComputedStyle(el).getPropertyValue('--ar')) || 1;
}
/* Break the run of compartments into r rows so the tray is as short as
   it can be, with no row allowed to tower over the others — the same
   problem a printer solves justifying plates across a sheet.        */
function split(ar, r, W, g, maxN, minN){
  var n = ar.length, pre = [0], i, j, k;
  for(i = 0; i < n; i++) pre.push(pre[i] + ar[i]);
  var best = [], cost = [];
  for(i = 0; i <= n; i++){ best.push([]); cost.push([]); }
  for(j = 0; j <= r; j++) for(i = 0; i <= n; i++){ cost[i][j] = Infinity; best[i][j] = 0; }
  cost[0][0] = 0;
  for(j = 1; j <= r; j++){
    for(i = j; i <= n; i++){
      for(k = Math.max(j - 1, i - maxN); k <= i - minN; k++){
        if(cost[k][j - 1] === Infinity) continue;
        var s = pre[i] - pre[k];
        if(s <= 0) continue;
        var c = cost[k][j - 1] + (W - g * (i - k - 1)) / s;
        if(c < cost[i][j]){ cost[i][j] = c; best[i][j] = k; }
      }
    }
  }
  if(cost[n][r] === Infinity) return null;
  var cuts = [n];
  for(i = n, j = r; j > 0; j--){ i = best[i][j]; cuts.unshift(i); }
  return cuts;
}

/* Chapters below the fold are not laid out until they scroll near, so a
   measure taken at load can be against a box that does not exist yet.
   Watch the container and re-fit whenever it actually changes size.     */
function onSettled(root, fn, watch){
  var queued = false, busy = false;
  var run = function(){
    queued = false;
    busy = true; fn(); busy = false;
  };
  var ping = function(){
    if(queued || busy) return;
    queued = true;
    requestAnimationFrame(run);
  };
  addEventListener('resize', ping);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(ping);
  [].slice.call(root.querySelectorAll('img')).forEach(function(im){
    if(!im.complete) im.addEventListener('load', ping, {once:true});
  });
  if(window.ResizeObserver && watch){
    var ro = new ResizeObserver(ping);
    [].concat(watch).forEach(function(el){ if(el) ro.observe(el); });
  }
  fn();
}

(function(){
  var wrap = document.getElementById('btrayw'),
      tray = document.getElementById('btray'),
      comp = document.getElementById('bcomp'),
      geo  = document.getElementById('bgeo');
  if(!wrap || !comp || !geo) return;

  var NS = 'http://www.w3.org/2000/svg';
  var MAXROWS = 5;

  /* the authored order, kept so a reflow never shuffles the work */
  var items = [].slice.call(comp.querySelectorAll(':scope > .brow > .bcell'));
  var pool  = [].slice.call(comp.children);

  function layout(){
    var live = items.filter(shown);
    if(!live.length) return;
    var g    = parseFloat(getComputedStyle(comp).gap) || 0,
        padX = parseFloat(getComputedStyle(tray).paddingLeft) || 0,
        padY = parseFloat(getComputedStyle(tray).paddingTop)  || 0,
        maxW = wrap.clientWidth  - padX * 2,
        maxH = wrap.clientHeight - padY * 2,
        ar   = live.map(ratio);

    /* Try every row count; each one, once narrowed to fit the height,
       covers some fraction of the tray. Keep whichever covers most.   */
    var pick = null;
    for(var r = 1; r <= Math.min(MAXROWS, live.length); r++){
      var cuts = split(ar, r, maxW, g, 5, live.length >= 2 * r ? 2 : 1) ||
                 split(ar, r, maxW, g, live.length, 1);
      if(!cuts) continue;
      var rows = [], invSum = 0, slack = 0, i, k;
      for(i = 0; i < r; i++){
        var a = cuts[i], b = cuts[i + 1], s = 0;
        for(k = a; k < b; k++) s += ar[k];
        rows.push({a:a, b:b, sum:s, n:b - a});
        invSum += 1 / s;
        slack  += g * (b - a - 1) / s;
      }
      var w = Math.min(maxW, (maxH - g * (r - 1) + slack) / invSum),
          h = g * (r - 1);
      rows.forEach(function(row){ h += (w - g * (row.n - 1)) / row.sum; });
      var score = (w / maxW) * (h / maxH);
      if(!pick || score > pick.score) pick = {rows:rows, W:w, score:score};
    }
    if(!pick) return;
    var W = pick.W;
    comp.style.width = W + 'px';

    /* rebuild the rows, then give every compartment an explicit box */
    while(pool.length < pick.rows.length){
      var d = document.createElement('div');
      d.className = 'brow';
      pool.push(d);
    }
    pool.forEach(function(r){ if(r.parentNode !== comp) comp.appendChild(r); r.hidden = true; });
    pick.rows.forEach(function(spec, i){
      var row = pool[i], h = (W - g * (spec.n - 1)) / spec.sum;
      row.hidden = false;
      row.style.height = h + 'px';
      for(var k = spec.a; k < spec.b; k++){
        var c = live[k], w = ar[k] * h;
        if(c.parentNode !== row) row.appendChild(c);
        c.style.flex = '0 0 ' + w + 'px';
        c.classList.toggle('terse', h < 132);
        if(c.classList.contains('bstack'))
          kids(c).forEach(function(s){
            var sh = w / ratio(s);
            s.style.height = sh + 'px';
            s.classList.toggle('terse', sh < 132);
          });
      }
    });
    draw();
  }

  /* ── the tray's own drawing: a guide through every compartment edge ── */
  function draw(){
    var box = tray.getBoundingClientRect(),
        W = Math.round(box.width), H = Math.round(box.height);
    if(!W || !H) return;
    geo.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    var xs = [], ys = [], lines = [], ticks = [];
    var push = function(arr, v){
      for(var i = 0; i < arr.length; i++) if(Math.abs(arr[i] - v) < 1.5) return;
      arr.push(v);
    };
    [].slice.call(comp.querySelectorAll('.bcell')).forEach(function(c){
      if(!shown(c)) return;
      var r = c.getBoundingClientRect();
      push(xs, r.left - box.left); push(xs, r.right  - box.left);
      push(ys, r.top  - box.top ); push(ys, r.bottom - box.top );
    });
    xs.forEach(function(x){ lines.push('M' + x.toFixed(1) + ' 0V' + H); });
    ys.forEach(function(y){ lines.push('M0 ' + y.toFixed(1) + 'H' + W); });
    xs.forEach(function(x){
      ys.forEach(function(y){
        ticks.push('M' + (x - 4).toFixed(1) + ' ' + y.toFixed(1) + 'h8',
                   'M' + x.toFixed(1) + ' ' + (y - 4).toFixed(1) + 'v8');
      });
    });

    var c = comp.getBoundingClientRect();
    geo.innerHTML =
      '<path class="grid" d="' + lines.join('') + '"/>' +
      '<rect class="edge" x="' + (c.left - box.left - 6).toFixed(1) +
      '" y="' + (c.top - box.top - 6).toFixed(1) +
      '" width="' + (c.width + 12).toFixed(1) +
      '" height="' + (c.height + 12).toFixed(1) + '"/>' +
      '<path class="tick" d="' + ticks.join('') + '"/>';
  }

  onSettled(comp, layout, wrap);
})();

/* ═══════════ 05 · THE PLATE WALL ═══════════
   Same partition solver as the bento, fitted the other way round: the wall
   must span its column, so the rows are chosen to put the most plate area
   on the wall, and the hatched ink slab takes the width they leave.     */
(function(){
  var runs = [].slice.call(document.querySelectorAll('.brun'));
  if(!runs.length) return;
  var GAP = 3, INK = 0.06;          /* the ink slab never drops below 6% */

  function fit(run){
    var plates = [].slice.call(run.querySelectorAll('.bplate')).filter(shown);
    if(!plates.length) return;

    /* collapse the wall and pin the slack-taker, so the column reports how
       much room is honestly left for plates */
    var col = run.parentNode, grow = run.previousElementSibling,
        keep = grow && grow.style.flex;
    run.style.height = '0px';
    if(grow) grow.style.flex = '0 0 auto';
    var W = run.clientWidth, H = col.clientHeight;
    kids(col).forEach(function(c){ if(c !== run) H -= c.offsetHeight; });
    if(grow) grow.style.flex = keep || '';
    run.style.height = '';
    if(!W || H <= 0) return;

    var ar = plates.map(ratio), pick = null;
    for(var r = 1; r <= Math.min(4, plates.length); r++){
      var cuts = split(ar, r, W, GAP, plates.length, 1);
      if(!cuts) continue;
      var rows = [], tall = GAP * (r - 1), i, k;
      for(i = 0; i < r; i++){
        var a = cuts[i], b = cuts[i + 1], sum = 0;
        for(k = a; k < b; k++) sum += ar[k];
        var h = (W - GAP * (b - a) - W * INK) / sum;
        rows.push({a:a, b:b, sum:sum, h:h});
        tall += h;
      }
      /* shrink to fit, then score on plate area and how much of the
         column's height the wall actually reaches */
      var scale = tall > H ? (H - GAP * (r - 1)) / (tall - GAP * (r - 1)) : 1,
          area = 0, used = GAP * (r - 1);
      rows.forEach(function(row){
        var h = row.h * scale;
        area += h * h * row.sum;
        used += h;
      });
      var score = area * Math.min(1, used / H);
      if(!pick || score > pick.score) pick = {rows:rows, scale:scale, score:score};
    }
    if(!pick) return;

    var inks = (run.dataset.ink || '').split('|'),
        red  = parseInt(run.dataset.red, 10),
        strips = [].slice.call(run.children).filter(function(c){
          return c.classList.contains('bstrip');
        });

    pick.rows.forEach(function(row, i){
      var strip = strips[i];
      if(!strip){
        strip = document.createElement('div');
        strip.className = 'bstrip';
        run.appendChild(strip);
        strips.push(strip);
      }
      strip.hidden = false;
      var h = row.h * pick.scale;
      strip.style.height = h + 'px';
      for(var k = row.a; k < row.b; k++){
        var p = plates[k];
        if(p.parentNode !== strip) strip.appendChild(p);
        p.style.width = (ar[k] * h) + 'px';
      }
      var ink = strip.querySelector('.binkfill');
      if(!ink){
        ink = document.createElement('i');
        ink.innerHTML = '<span></span>';
        strip.appendChild(ink);
      }
      strip.appendChild(ink);
      ink.className = 'binkfill' + (i === red ? ' red' : '');
      ink.firstChild.textContent = inks[i % inks.length] || '';
    });
    strips.slice(pick.rows.length).forEach(function(st){ st.hidden = true; });
  }

  onSettled(document.getElementById('s-brut') || document.body, function(){
    runs.forEach(fit);
  }, runs.map(function(r){ return r.parentNode; }));
})();

/* ═══════════ THE BOARD — frame, rotation, and a held mark ═══════════ */
(function(){
  var hang=document.getElementById('hang'), frame=document.getElementById('bigframe');
  if(!hang||!frame)return;
  var chips=[].slice.call(hang.querySelectorAll('.piece'));
  if(!chips.length)return;
  var plate=document.getElementById('bfplate'), a=document.getElementById('bfa'), bimg=document.getElementById('bfb');
  var nameEl=document.getElementById('bfname'), kindEl=document.getElementById('bfkind'),
      noEl=document.getElementById('bfno'), prog=document.getElementById('bfprog');
  var reduceM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var i=-1, front=a, back=bimg, hold=0, t0=performance.now(), DUR=1750, PAUSE=6500, live=false;

  function show(n, manual){
    if(n===i)return;
    i=(n+chips.length)%chips.length;
    var c=chips[i];
    back.src='assets/'+c.dataset.slug+'-lg.webp';
    back.alt=c.dataset.name;
    plate.style.setProperty('--bg', c.dataset.ground||'#f4f1ea');
    back.classList.add('on'); front.classList.remove('on');
    var tmp=front; front=back; back=tmp;
    nameEl.textContent=c.dataset.name; kindEl.textContent=c.dataset.kind; noEl.textContent=c.dataset.no;
    chips.forEach(function(x){x.classList.remove('active');});
    c.classList.add('active');
    t0=performance.now(); hold=manual?PAUSE:0;
  }

  chips.forEach(function(c,n){
    c.addEventListener('click',function(){show(n,true);});
    c.addEventListener('mouseenter',function(){ if(!reduceM) show(n,true); });
  });

  /* only runs while the chapter is actually on screen */
  var io=new IntersectionObserver(function(e){ live=e[0].isIntersecting; },{threshold:.25});
  io.observe(frame);

  show(0,false);
  (function tick(now){
    requestAnimationFrame(tick);
    if(!live||reduceM)return;
    var span=DUR+hold, p=(now-t0)/span;
    prog.style.width=(Math.min(1,Math.max(0,p))*100).toFixed(1)+'%';
    if(p>=1){ hold=0; show(i+1,false); }
  })(performance.now());
})();

/* ═══════════ AMBIENCE — two beds, cross-faded per chapter ═══════════
   Off until asked for: nothing loads, nothing plays, and the choice is
   remembered. Each chapter declares which bed it belongs to.          */
(function(){
  var btn=document.getElementById('sndBtn'), label=document.getElementById('sndLabel');
  var beds={paper:document.getElementById('bedPaper'), dark:document.getElementById('bedDark')};
  if(!btn||!beds.paper||!beds.dark)return;
  var on=false, want='dark', LEVEL=.34, loaded=false, raf=0;

  try{ if(localStorage.getItem('md-sound')==='1') setTimeout(function(){toggle(true);},900); }catch(e){}

  function ramp(){
    cancelAnimationFrame(raf);
    (function step(){
      var busy=false;
      for(var k in beds){
        var el=beds[k], target=(on && k===want)?LEVEL:0;
        var v=el.volume + (target-el.volume)*0.06;
        if(Math.abs(target-v)<0.004)v=target;
        try{el.volume=Math.max(0,Math.min(1,v));}catch(e){}
        if(v!==target)busy=true;
        if(v===0&&!el.paused&&!(on&&k===want))el.pause();
      }
      if(busy)raf=requestAnimationFrame(step);
    })();
  }

  function toggle(state){
    on=(typeof state==='boolean')?state:!on;
    btn.setAttribute('aria-pressed',on?'true':'false');
    if(label)label.textContent=on?'Sound on':'Sound off';
    try{localStorage.setItem('md-sound',on?'1':'0');}catch(e){}
    if(on){
      if(!loaded){ for(var k in beds){beds[k].preload='auto';beds[k].volume=0;beds[k].load();} loaded=true; }
      var el=beds[want];
      if(el&&el.paused){var pr=el.play(); if(pr&&pr.catch)pr.catch(function(){});}
    }
    ramp();
  }
  btn.addEventListener('click',function(){toggle();});

  /* the loudest-on-screen chapter owns the bed */
  var stages=[].slice.call(document.querySelectorAll('.stage[data-bed]'));
  var io=new IntersectionObserver(function(entries){
    var best=null,bestR=0;
    entries.forEach(function(e){ if(e.intersectionRatio>bestR){bestR=e.intersectionRatio;best=e.target;} });
    if(!best||bestR<.35)return;
    var next=best.dataset.bed;
    if(next===want)return;
    want=next;
    if(on){
      var el=beds[want];
      if(el&&el.paused){var pr=el.play(); if(pr&&pr.catch)pr.catch(function(){});}
      ramp();
    }
  },{threshold:[.35,.6,.85]});
  stages.forEach(function(s){io.observe(s);});
})();

/* ═══════════ KEYBOARD — step the book chapter by chapter ═══════════ */
(function(){
  var stages=[].slice.call(document.querySelectorAll('.stage'));
  if(!stages.length)return;
  function nearest(){
    var best=0,bd=1e9;
    for(var i=0;i<stages.length;i++){
      var d=Math.abs(stages[i].offsetTop-scrollY);
      if(d<bd){bd=d;best=i;}
    }
    return best;
  }
  function go(i){
    i=Math.max(0,Math.min(stages.length-1,i));
    scrollTo({top:stages[i].offsetTop+2,behavior:'smooth'});
  }
  addEventListener('keydown',function(e){
    if(e.metaKey||e.ctrlKey||e.altKey)return;
    var t=e.target;
    if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable))return;
    if(e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();go(nearest()+1);}
    else if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();go(nearest()-1);}
    else if(e.key==='Home'){e.preventDefault();go(0);}
    else if(e.key==='End'){e.preventDefault();go(stages.length-1);}
    else if(e.key==='m'||e.key==='M'){var s=document.getElementById('sndBtn');if(s)s.click();}
  });
})();
