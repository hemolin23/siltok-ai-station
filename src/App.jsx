import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, CircleHelp, Cpu, FileCheck2, Film, Image as ImageIcon, Layers3, LockKeyhole, MessageSquareText, MonitorUp, ShieldCheck, Workflow, Play, Plus, SlidersHorizontal, Sparkles, Box, RotateCcw, Volume2, WandSparkles } from 'lucide-react';
import styles from './station.module.css';
import visual from './product-visual.module.css';

const APPLY_URL = 'https://my.feishu.cn/share/base/shrcnVgo3Gj2zxuRtMYljrAmozd';
const COLLAB_URL = 'https://my.feishu.cn/share/base/shrcn63I30xlVeGwwS1aRNVMm7b';
const OFFICIAL_URL = 'https://siltok-ai.com/products/ai-station';
const CREATOR_PROTOTYPE_URL = 'https://hemolin23.github.io/siltok-creator-prototype/';

const directedCases = [
  { n: '01', icon: ImageIcon, title: '人物立绘', copy: '固定提示词与尺寸生成单人全身立绘，记录可用率、细节问题与返工次数。' },
  { n: '02', icon: Film, title: '图生视频镜头', copy: '用统一参考图完成短镜头，记录动作、稳定性、生成时长与失败模式。' },
  { n: '03', icon: Layers3, title: '角色一致性', copy: '同一角色完成多个景别或连续镜头，判断身份、服饰和画面风格是否稳定。' },
  { n: '04', icon: Workflow, title: 'ComfyUI 工作流', copy: '导入指定或自有工作流，检查节点依赖、执行过程、结果与复现条件。' },
  { n: '05', icon: MonitorUp, title: '批量与异常恢复', copy: '连续执行一组任务，记录中断、报错、恢复方式和对日常生产的影响。' },
];

const testDays = [
  ['DAY 1', '熟悉与试跑', '完成操作引导，选择一个最小测试任务并首次运行'],
  ['DAY 2', '自由测试', '根据自己的时间继续测试，保留结果、报错与失败样本'],
  ['DAY 3', '反馈与复盘', '提交使用感受，并通过简短沟通确认问题与能力边界'],
];

const ecosystem = [
  ['AI短剧 / 漫剧', '30%', '#0b63f6'], ['电商 / 广告内容', '20%', '#2f80ed'],
  ['ComfyUI / 工作流', '20%', '#51a5ff'], ['影视 CG / 视觉艺术', '15%', '#78b9ff'],
  ['独立创作者 / 数艺学生', '10%', '#a2ceff'], ['数码测评 / 生态伙伴', '5%', '#d4e9ff'],
];

const products = [
  { name: 'Siltok Base', label: '个人创作', copy: '面向独立创作者和轻量生产任务，用于验证本地模型、基础节点与日常素材工作流。', points: ['日常素材试作与版本迭代', '本地保存项目与创作资产', '预置工具与基础工作流'] },
  { name: 'Siltok Pro', label: '专业工作流', copy: '面向工作室和持续生产场景，重点验证更复杂的模型、ComfyUI 节点与团队工作流。', points: ['复杂工作流与多轮调试', '更高频的批量生产任务', '按业务场景提供部署支持'] },
];

const creatorScenes = [
  ['AI 真人短剧', '批量生成高频剧情内容'], ['AI 漫剧 / 动画短片', '快速迭代角色与分镜'],
  ['电商素材批量生产', '服务品牌、商家与代运营团队'], ['影视后期与特效', '辅助项目后期制作'],
  ['4A 广告与品牌 TVC', '打造高质量品牌视觉素材'], ['自媒体内容', '支持稳定的内容更新'],
  ['互联网广告服务商', '服务 SMB 广告投放'], ['游戏 CG', '批量制作角色与场景素材'],
];

const localValues = [
  ['本地优先', '未发布素材、提示词和项目文件留在自己的环境'], ['云端协同', '按任务选择本地或云端，不被单一模型和平台绑定'], ['工作流资产', '沉淀 ComfyUI 节点、参数配置、模板与失败经验'],
];

const productLogic = [
  ['模型底座持续变化', '开源模型会不断更新。设备的长期价值，不应只绑定某一个模型，而在于可升级、可维护的运行环境。'],
  ['推理工程决定可用性', '能运行只是起点；模型加载、显存与内存调度、任务队列、异常恢复和依赖管理，决定能否进入生产。'],
  ['业务资产形成壁垒', '素材、角色设定、提示词、节点组合、参数配置和质量判断标准，可以持续沉淀和复用。'],
];

const capabilityStages = [
  ['当前重点', '本地运行环境、ComfyUI 节点部署、模型与依赖管理、工作流测试和创作资产留存。'],
  ['正在验证', '不同模型的加载与精度表现、复杂工作流稳定性、批量任务、长时运行和失败恢复。'],
  ['不做预先承诺', '不承诺所有任务快于云端、不承诺所有开源模型可用，也不承诺一次生成即可达到精品成片标准。'],
];

const techAdvantages = [
  ['01', '桌面级本地 AI 工作站', '一台设备统一承载模型、节点、素材与工作流。'],
  ['02', '模型运行与资源协同', '围绕 GPU、内存、存储和模型加载进行系统级适配，降低创作者自行配环境的门槛。'],
  ['03', '保留精度的加速路径', '通过系统级优化提升运行效率；不同模型的精度、速度与稳定性正在逐项实测。'],
  ['04', '开放 ComfyUI 生态', '支持部署 ComfyUI 节点和自有工作流，不把用户锁在单一模型或固定模板里。'],
];

const userQuestions = [
  ['这到底是什么产品？', 'Siltok AI Station 是一台面向本地 AI 部署与创作工作流的桌面主机，统一管理模型环境、ComfyUI 节点、素材和任务运行。'],
  ['内测免费吗？在哪里使用？', '入选当前内测后，约定范围内不收取设备测试使用费。测试以公司现场或远程连接 Siltok 测试设备为主，不要求你把模型安装到自己的电脑；如涉及第三方付费 API，会在测试前单独说明。'],
  ['我的电脑或 Mac 能带动吗？', '参加远程内测时，主要算力由 Siltok 测试设备承担，你的 Mac 或普通电脑用于远程连接和操作即可。未来如需部署到自有设备，则要根据模型、显存和工作流单独评估。'],
  ['这是做 AI 视频的模型吗？', 'Siltok 提供本地模型运行与工作流环境，可按场景配置图像、视频、超分和 ComfyUI 工作流。具体可用模型与效果，以当期测试环境为准。'],
  ['主要优势是算力价格更低吗？', '核心价值包括素材本地留存、减少云端排队和平台绑定、工作流复现，以及模型与节点按业务调整。成本优势需要通过真实任务测算。'],
  ['H3 不如其他云端模型怎么办？', '我们不要求所有任务只用一个模型。本地与云端可以协同：不同模型负责更擅长的环节。内测正是要确认真人、动画、电商等场景分别适合什么模型，以及哪些任务现阶段仍应使用云端。'],
  ['支持超分和 ComfyUI 节点吗？', '支持围绕 ComfyUI 节点和工作流进行部署。超分可作为具体项目的测试环节，但模型、节点版本和资源占用需要在排期前确认，不默认承诺所有插件一次兼容。'],
  ['我现在项目忙，能晚点参加吗？', '可以。你可以先登记方向，等测试环境和时间匹配后再加入。正式测试周期为 3 天，可在约定时间窗口内自由安排，不要求连续在线，也不需要迁移完整项目。'],
  ['电商团队可以怎么测试？', '可以从商品图批量变体、场景替换、短视频镜头、超分或一条现有 ComfyUI 流程开始。我们会先确认产量、可用率和返工标准，再安排最小测试任务。'],
  ['测试期间还有其他费用吗？', '约定的内测设备使用本身免费，不会自动转为付费服务。测试时长、支持范围以及可能产生的第三方模型或 API 费用，会在开始前书面确认。'],
];

const showreel = [
  { src: 'cases/clock-runner.mp4', poster: 'cases/clock-runner-poster.jpg', title: '时钟之上', copy: '动画角色与大幅运镜', meta: ['动画叙事', '角色运动', '镜头调度'], detail: '观察角色在复杂机械场景中的运动连贯性，以及远近景切换时的主体稳定性。' },
  { src: 'cases/ancient-market.mp4', poster: 'cases/ancient-market-poster.jpg', title: '市井一瞬', copy: '写实人物与场景转换', meta: ['写实人物', '连续场景', '电影光影'], detail: '观察人物身份、服饰与面部特征在室内外场景转换中的一致性。' },
  { src: 'cases/mechanical-pharaoh.mp4', poster: 'cases/mechanical-pharaoh-poster.jpg', title: '机械法老', copy: '材质细节与主体环绕', meta: ['机械材质', '主体环绕', '黑色背景'], detail: '观察高反差画面中的金属、石材和机械结构，以及环绕视角下的细节保持。' },
  { src: 'cases/dragon-valley.mp4', poster: 'cases/dragon-valley-poster.jpg', title: '龙临峡谷', copy: '大场景、群像与氛围光', meta: ['奇幻场景', '群像调度', '氛围光'], detail: '观察复杂环境、远景层次和多个运动主体在连续镜头中的空间关系。' },
];

const workbenchClips = [
  { src: 'forbidden-bride/ep01-sh03.mp4', title: 'EP01 · 契约场景', tag: 'GENERATED' },
  { src: 'forbidden-bride/r18-space.jpg', title: '走廊空间锚点', tag: 'SPACE' },
  { src: 'forbidden-bride/r18-viewpoint.jpg', title: '机位与景别参考', tag: 'VIEWPOINT' },
  { src: 'forbidden-bride/r18-start.jpg', title: 'R18 首帧', tag: 'START FRAME' },
  { src: 'forbidden-bride/r18-end.jpg', title: 'R18 尾帧', tag: 'END FRAME' },
  { src: 'forbidden-bride/elvira-identity.jpg', title: 'Elvira 身份参考', tag: 'IDENTITY' },
  { src: 'forbidden-bride/lucas-identity.jpg', title: 'Lucas 身份参考', tag: 'IDENTITY' },
];

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = [...document.querySelectorAll('main > section')];
    if (reduceMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.setAttribute('data-visible', 'true'));
      return undefined;
    }
    sections.forEach((section) => section.setAttribute('data-reveal', 'true'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', 'true');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  if (window.location.pathname.endsWith('/co-create.html')) return <CoCreatePage />;

  return <main className={styles.page}>
    <header className={styles.nav}>
      <a href="#top" className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok" /><span>LABS</span></a>
      <nav><a href="#product-ui">创作工作站</a><a href="#visual-story">创作流程</a><a href="#showreel">生成样片</a><a href="#advantages">独特优势</a></nav>
      <a className={styles.navCta} href={asset('co-create.html')}>邀请共创 <ArrowRight /></a>
    </header>

    <section className={styles.hero} id="top">
      <div className={styles.heroBackdrop} aria-hidden="true"><img src={asset('siltok-creative-engine-hero.png')} alt=""/></div>
      <div className={styles.heroAura} aria-hidden="true"><i/><i/><i/></div>
      <HeroFluidField />
      <div className={styles.heroSpatialRig} aria-hidden="true">
        <div className={styles.heroCameraPath}><i/><i/><i/><span>CAMERA PATH / 03</span></div>
        <div className={styles.heroReferenceDeck}>
          <figure><img src={asset('forbidden-bride/r18-space.jpg')} alt=""/><figcaption>SPACE REF</figcaption></figure>
          <figure><img src={asset('forbidden-bride/elvira-identity.jpg')} alt=""/><figcaption>IDENTITY REF</figcaption></figure>
          <figure><img src={asset('forbidden-bride/r18-viewpoint.jpg')} alt=""/><figcaption>CAMERA REF</figcaption></figure>
        </div>
        <div className={styles.heroRemoteApp}>
          <header><img src={asset('brand/siltok-dash-icon.png')} alt=""/><div><b>Siltok Dash</b><span>REMOTE CREATIVE DESKTOP</span></div><i><em/>ONLINE</i></header>
          <main><div className={styles.remotePreview}><video src={asset('forbidden-bride/ep01-sh03.mp4')} muted autoPlay loop playsInline/><span>EP01 / SH03 · LIVE</span></div><aside><span>创作节点</span><b>Forbidden Bride</b><small>30 SHOTS · 9:16</small><div><i/><em>H3 多参考</em><strong>READY</strong></div><div><i/><em>FLUX 文生图</em><strong>READY</strong></div><div><i/><em>图生图编辑</em><strong>READY</strong></div></aside></main>
          <footer><span><i/>远程连接本地工作区</span><b>创作节点 01</b></footer>
        </div>
        <div className={styles.heroSceneBadge}><span>SILTOK DASH</span><b>远程连接 · 模型路由 · 本地队列</b><i><em/>创作节点已在线</i></div>
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}><i/> DESKTOP AI STATION · LOCAL CREATIVE SYSTEM</p>
        <h1>Siltok<br/><em>AI Station.</em></h1>
        <h2>把开源模型与工作流，带回创作者桌面。</h2>
        <p className={styles.lead}>一张画布，把文字、图片、视频、模型、素材与作品连成完整创作流。</p>
        <div className={styles.actions}><a className={styles.primary} href="#product-ui">进入创作工作站 <ArrowRight /></a><a className={styles.secondary} href="#showreel">观看样片</a></div>
      </div>
      <div className={styles.heroFacts}><div><b>LOCAL</b><span>素材与项目留在本地</span></div><div><b>OPEN</b><span>模型与节点持续扩展</span></div><div><b>REUSABLE</b><span>工作流成为创作资产</span></div></div>
    </section>

    <div className={styles.signalRail} aria-label="Siltok 创作能力"><div><span>文字变成画面</span><span>图片自然动起来</span><span>首尾帧控制镜头</span><span>多参考保持一致</span><span>素材留在本地</span><span>工作流持续复用</span><span>文字变成画面</span><span>图片自然动起来</span><span>首尾帧控制镜头</span><span>多参考保持一致</span><span>素材留在本地</span><span>工作流持续复用</span></div></div>

    <ProductUISuite />
    <CreationJourney />
    <Showreel />
    <AdvantagesSection />
    <section className={styles.coCreateGateway}><div className={styles.gatewayFluid} aria-hidden="true"><i/><i/><i/></div><div className={styles.gatewayOffer}><span>CO-CREATE / CREATOR NETWORK</span><h2>把真实任务，<br/>接进 Siltok。</h2><div className={styles.gatewayCards}><article><b>01</b><strong>AI 内容与商业项目</strong><small>BRIEF · PRODUCTION · DELIVERY</small></article><article><b>02</b><strong>平台、技术与发行资源</strong><small>PLATFORM · SERVICE · DISTRIBUTION</small></article><article><b>03</b><strong>本地 AI 与工作流共创</strong><small>DEVICE · COMFYUI · TEST</small></article></div><a href={asset('co-create.html')}>进入邀请共创页 <ArrowRight/></a></div></section>

    <footer><a href="#top" className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok"/><span>LABS</span></a><p>北京硅基词元科技有限公司 · 本地 AI 视频创作工作站</p><div><a href={OFFICIAL_URL} target="_blank" rel="noreferrer">产品官网</a><a href={asset('co-create.html')}>邀请共创</a></div></footer>
  </main>;
}

function HeroFluidField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.closest('section');
    if (!canvas || !host) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;
    const pointer = { x: 0, y: 0, active: false };
    const palette = ['94,169,255', '223,242,255', '56,132,255', '91,224,255', '151,198,255'];
    const streams = Array.from({ length: 9 }, (_, index) => ({
      x: 0, y: 0, vx: 0, vy: 0, phase: index * .77, width: .7 + (index % 4) * .55, history: [],
    }));

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pointer.x = width * .72;
      pointer.y = height * .42;
      streams.forEach((stream, index) => {
        stream.x = width * (.58 + index * .035);
        stream.y = height * (.28 + (index % 4) * .11);
        stream.history = Array.from({ length: 34 }, () => ({ x: stream.x, y: stream.y }));
      });
      ctx.clearRect(0, 0, width, height);
    };

    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      host.style.setProperty('--pointer-x', `${(pointer.x / Math.max(width, 1) - .5) * 2}`);
      host.style.setProperty('--pointer-y', `${(pointer.y / Math.max(height, 1) - .5) * 2}`);
    };
    const onPointerLeave = () => { pointer.active = false; };
    const onScroll = () => {
      const rect = host.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1.25, -rect.top / Math.max(rect.height, 1)));
      host.style.setProperty('--hero-scroll', `${progress}`);
    };

    const draw = () => {
      frame += 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, .105)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      const idleX = width * (.7 + Math.sin(frame * .003) * .12);
      const idleY = height * (.46 + Math.cos(frame * .0022) * .2);

      streams.forEach((stream, index) => {
        const targetX = pointer.active ? pointer.x : idleX;
        const targetY = pointer.active ? pointer.y : idleY;
        const dx = targetX - stream.x;
        const dy = targetY - stream.y;
        const distance = Math.max(90, Math.hypot(dx, dy));
        const flow = Math.sin(stream.y * .008 + frame * .012 + stream.phase) + Math.cos(stream.x * .005 - frame * .009);
        const orbit = stream.phase + frame * (.006 + index * .00018);
        stream.vx += dx / distance * .16 + Math.cos(orbit) * .11 + Math.cos(flow) * .14;
        stream.vy += dy / distance * .16 + Math.sin(orbit) * .11 + Math.sin(flow) * .14;
        stream.vx *= .968;
        stream.vy *= .968;
        stream.x += stream.vx;
        stream.y += stream.vy;
        if (stream.x < -80 || stream.x > width + 80 || stream.y < -80 || stream.y > height + 80) {
          stream.x = width * .72;
          stream.y = height * .42;
          stream.history.length = 0;
        }
        stream.history.push({ x: stream.x, y: stream.y });
        if (stream.history.length > 48) stream.history.shift();

        const color = palette[index % palette.length];
        ctx.beginPath();
        stream.history.forEach((point, pointIndex) => {
          if (pointIndex === 0) ctx.moveTo(point.x, point.y);
          else {
            const previous = stream.history[pointIndex - 1];
            ctx.quadraticCurveTo(previous.x, previous.y, (previous.x + point.x) / 2, (previous.y + point.y) / 2);
          }
        });
        ctx.strokeStyle = `rgba(${color}, ${.035 + (index % 3) * .012})`;
        ctx.lineWidth = 13 + stream.width * 3;
        ctx.shadowColor = `rgba(${color}, .58)`;
        ctx.shadowBlur = 34 + index * 2;
        ctx.stroke();
        ctx.strokeStyle = `rgba(${color}, ${.2 + (index % 3) * .07})`;
        ctx.lineWidth = stream.width;
        ctx.shadowColor = `rgba(${color}, .82)`;
        ctx.shadowBlur = 19 + index * 2;
        ctx.stroke();
      });
      ctx.shadowBlur = 0;
      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    onScroll();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    host.addEventListener('pointermove', onPointerMove, { passive: true });
    host.addEventListener('pointerleave', onPointerLeave);
    if (!reduceMotion) draw();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.heroFluidField} aria-hidden="true"/>;
}

function SectionHead({n,label,title,copy}) {
  return <div className={styles.sectionHead}><span>{n}</span><div><p>{label}</p><h2>{title}</h2></div><p>{copy}</p></div>;
}

function ProductOverview() {
  return <section className={styles.productOverview} id="product-overview">
    <div className={styles.overviewIntro}><p>PRODUCT FIRST · WHAT IT IS</p><h2>不是一台只会跑模型的主机。<br/>是一套本地 AI 创作系统。</h2><div><p>Siltok AI Station 把桌面硬件、模型环境与创作画布连成一体：从选择模型、组织参考素材，到生成、回看和复用工作流，都在同一个系统里完成。</p><a href="#creator-canvas">进入画布介绍 <ArrowRight/></a></div></div>
    <div className={styles.techAdvantages}>{techAdvantages.map(([n,title,copy])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    <div className={styles.breakthroughVisual}><img src={asset(showreel[2].poster)} alt="机械法老生成样片"/><div><span>WORKFLOW AS AN ASSET</span><h3>模型会更新。<br/>你的工作流会留下。</h3><p>成功的参数、节点、素材与判断标准，都成为下一次创作的起点。</p></div><b>LOCAL / OPEN / REUSABLE</b></div>
  </section>;
}

function ProductDetails() {
  return <section className={styles.products} id="product-details">
    <SectionHead n="04" label="SILTOK AI STATION" title="模型会变，工作流会留下来。" copy="AI 视频正在走向可持续运行的生产系统。Siltok 统一管理本地模型、节点、素材和任务，让创作流程能够复用。" />
    <div className={visual.logicBlock}><div className={visual.logicLead}><span>FROM MODEL TO SYSTEM</span><h3>开源降低模型门槛，<br/>工程与业务资产决定长期价值。</h3><p>设备不是某一个模型的外壳，而是持续承接新模型、新节点与团队工作流的本地底座。</p></div><div className={visual.logicGrid}>{productLogic.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h4>{title}</h4><p>{copy}</p></article>)}</div></div>
    <div className={styles.workflowMap}>
      <div className={styles.workflowMapHead}><span>LOCAL SYSTEM MAP</span><h3>从模型到作品，<br/>每一步都在同一套系统里。</h3><p>节点不是装饰，它们就是 Siltok 的运行方式。</p></div>
      <div className={styles.workflowTrack}>
        <article><span>01</span><b>模型环境</b><small>MODEL</small></article>
        <article><span>02</span><b>节点图</b><small>GRAPH</small></article>
        <article className={styles.workflowCore}><img src={asset('siltok-ai-station-perspective.png')} alt=""/><b>Siltok Station</b><small>LOCAL CORE</small></article>
        <article><span>03</span><b>渲染队列</b><small>QUEUE</small></article>
        <article><span>04</span><b>作品资产</b><small>OUTPUT</small></article>
      </div>
    </div>
    <div className={visual.productShowcase}><div><span>DESKTOP LOCAL AI</span><h3>为创作者设计的<br/>桌面级 AI Station</h3><p>紧凑机身承载本地模型、ComfyUI 节点、创作素材与可复用工作流。</p></div><img src={asset('siltok-ai-station-perspective.png')} alt="Siltok AI Station 产品透视图"/></div>
    <div className={styles.productGrid}>{products.map((p,i)=><article key={p.name}><div className={styles.productTop}><Cpu/><span>{p.label}</span><b>0{i+1}</b></div><h3>{p.name}</h3><p>{p.copy}</p><ul>{p.points.map(x=><li key={x}><Check/>{x}</li>)}</ul></article>)}</div>
    <div className={visual.valueGrid}>{localValues.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><b>{title}</b><p>{copy}</p></article>)}</div>
    <div className={visual.sceneIntro}><div><span>CREATOR COVERAGE</span><h3>从个人创作到专业制作团队</h3><p>覆盖八类高频内容生产场景，面向真实项目中的稳定性、可控性与工作流复用。</p></div><div className={visual.sceneGrid}>{creatorScenes.map(([title,copy])=><article key={title}><b>{title}</b><span>{copy}</span></article>)}</div></div>
    <div className={visual.techStrip}><div><span>资源协同</span><b>围绕 CPU、GPU、内存与存储组织模型加载和任务调度</b></div><div><span>推理优化</span><b>在硬件边界内平衡精度、稳定性与资源占用</b></div><div><span>流程管理</span><b>把模型、节点、素材与任务记录组织成可复用的生产流程</b></div></div>
    <div className={styles.performanceBand} id="performance">
      <div className={styles.performanceLead}><span>GENERATION EFFICIENCY</span><h3>速度要可用，<br/>也要可解释。</h3><p>不用一个脱离硬件、分辨率和工作流的数字制造错误预期。</p></div>
      <div className={styles.performanceGrid}>
        <article><span>01</span><b>无云端排队</b><p>任务进入本地队列，可持续运行、查看与恢复。</p></article>
        <article><span>02</span><b>测试条件透明</b><p>展示显卡、模型、分辨率、帧数与关键参数。</p></article>
        <article><span>03</span><b>按真实流程比较</b><p>同一任务对比生成、返工和稳定性，再判断效率。</p></article>
      </div>
      <p className={styles.performanceNote}><i/>当前状态：不同模型与工作流正在逐项实测；完整基准会随测试条件一起公布。</p>
    </div>
    <div className={visual.stageBlock}><div className={visual.stageTitle}><span>CAPABILITY BOUNDARY</span><h3>能力边界，先说清楚。</h3><p>产品仍处于共创阶段。以下内容区分当前重点、正在验证与不做预先承诺的事项。</p></div><div className={visual.stageGrid}>{capabilityStages.map(([title,copy],i)=><article key={title} data-stage={i}><b>{title}</b><p>{copy}</p></article>)}</div></div>
    <div className={visual.disclaimer}><ShieldCheck/><span><b>参数仅作参考，非最终版</b>产品配置、模型能力和功能范围以最终发布与实际测试结果为准。</span></div>
    <div className={visual.productLinks}><a className={styles.officialLink} href={OFFICIAL_URL} target="_blank" rel="noreferrer">查看产品官网 <ArrowRight/></a></div>
  </section>;
}

function CanvasExperience() {
  const [mode, setMode] = useState('视频');
  const tools = [['文字','T'],['图片','▧'],['视频','▷'],['作品','□']];
  return <section className={styles.canvasSection} id="creator-canvas">
    <SectionHead n="01" label="SILTOK CREATOR" title="从想法到成片，都在这一张画布里。" copy="文字、图片、视频和作品资产共用同一套项目上下文。" />
    <div className={styles.canvasWindow}>
      <div className={styles.canvasTop}><b>Siltok Creator</b><span>创作中心</span><span>我的作品</span><span>素材库</span><i>LOCAL · 项目自动保存</i></div>
      <div className={styles.canvasBody}>
        <aside>{tools.map(([name,icon])=><button key={name} onClick={()=>setMode(name)} className={mode===name?styles.canvasToolOn:''}>{icon}<small>{name}</small></button>)}</aside>
        <div className={styles.canvasStage}>
          <div className={styles.canvasStageHead}><b>{mode}预览</b><span>画布 80% · 版本 12</span></div>
          {mode==='视频'&&<video src={asset(showreel[2].src)} poster={asset(showreel[2].poster)} autoPlay muted loop playsInline preload="metadata"/>}
          {mode==='图片'&&<div className={styles.canvasImageBoard}>{showreel.map(item=><img key={item.poster} src={asset(item.poster)} alt=""/>)}</div>}
          {mode==='文字'&&<div className={styles.canvasTextBoard}><span>镜头 01</span><h4>机械法老从黑暗中醒来，镜头沿金属结构缓慢环绕。</h4><span>镜头 02</span><h4>峡谷云雾被巨龙的翼尖切开，远处城市逐渐显现。</h4></div>}
          {mode==='作品'&&<div className={styles.canvasImageBoard}>{showreel.map(item=><figure key={item.poster}><img src={asset(item.poster)} alt=""/><b>{item.title}</b></figure>)}</div>}
          <div className={styles.canvasTimeline}><i/><i/><i/><i/><i/><i/></div>
        </div>
        <div className={styles.canvasControls}><span>VIDEO WORKFLOW</span><h3>{mode}生成</h3><label>创作模型</label><div className={styles.canvasSelect}>MiniMax H3 <b>⌄</b></div><label>生成方式</label><div className={styles.canvasModes}><b>文生视频</b><span>图片生成视频</span><span>首尾帧</span><span>全能参考</span></div><label>画面描述 <em>✦ 提示词助手</em></label><p>描述人物、场景、动作、镜头和声音，也可以拖入图片、视频或音频参考。</p><label>输出规格</label><div className={styles.canvasSpec}><span><small>清晰度</small><b>768p</b></span><span><small>比例</small><b>16:9</b></span><span><small>时长</small><b>5–15 秒</b></span><span><small>声音</small><b>可选</b></span><span><small>数量</small><b>1 / 2 / 4</b></span><span><small>服务</small><b>标准 / 高速</b></span></div><div className={styles.canvasQueue}><i/><span>本地渲染队列可见 · 完成一条展示一条</span></div><button className={styles.generateButton}>立即生成 <ArrowRight/></button></div>
      </div>
    </div>
    <div className={styles.canvasFeatureRail}><span>多模型选择</span><span>提示词助手</span><span>图／视频／音频参考</span><span>首尾帧控制</span><span>多比例与时长</span><span>批量生成</span><span>本地队列</span><span>作品与素材库</span><a href={CREATOR_PROTOTYPE_URL} target="_blank" rel="noreferrer">打开完整原型 <ArrowRight/></a></div>
  </section>;
}

const uiScenes = [
  ['01','创作工作台总览','项目、素材、任务、模型与作品同时在场','overview'],
  ['02','视频创作画布','预览、时间线与生成参数保持同一上下文','canvas'],
  ['03','模型选择器','看见模型擅长什么，再决定让谁工作','models'],
  ['04','多参考素材板','人物、场景、动作、首尾帧与声音自由组合','references'],
  ['05','镜头编排与时间线','镜头、关键帧、提示词和声音轨道横向展开','timeline'],
  ['06','本地渲染队列','等待、生成、完成与失败恢复都清晰可见','queue'],
  ['07','工作流保存','把模型、参数、节点与素材封装成创作配方','recipe'],
  ['08','作品与素材库','角色、场景、片段和版本沉淀为视觉资产','library'],
];

function ProductUISuite() {
  const [active, setActive] = useState(0);
  const [focus, setFocus] = useState('多模型');
  const [selectedModel, setSelectedModel] = useState('H3');
  return <section className={styles.uiSuite} id="product-ui">
    <div className={styles.stationBar}><span>SILTOK CREATOR</span><b>远程创作工作区</b><i><em/>本地创作节点已连接</i></div>
    <div className={styles.uiSuiteNav}>{uiScenes.map(([n,title],i)=><button key={n} className={i===active?styles.uiSuiteNavOn:''} onClick={()=>setActive(i)}><span>{n}</span>{title}</button>)}</div>
    <div className={styles.uiSuiteFrame}>
      <div className={styles.uiSuiteMeta}><span>{uiScenes[active][0]} / 08</span><div><h3>{uiScenes[active][1]}</h3><p>{uiScenes[active][2]}</p></div></div>
      <ProductScreen type={uiScenes[active][3]} focus={focus} selectedModel={selectedModel} onSelectModel={setSelectedModel}/>
      <div className={styles.uiHotspots}>{['多模型','多参考','本地生成','镜头编排','任务队列','工作流复用'].map(x=><button key={x} onMouseEnter={()=>setFocus(x)} onFocus={()=>setFocus(x)} className={focus===x?styles.uiHotspotOn:''}><i/>{x}</button>)}</div>
    </div>
  </section>;
}

function AppChrome({title='《Forbidden Bride》短剧项目',children}) {
  return <div className={styles.productScreen}>
    <aside className={styles.productSidebar}><b>S</b><button className={styles.sideOn}>⌁</button><button>▧</button><button>◫</button><button>◇</button><button>◉</button><i/><button>⚙</button></aside>
    <div className={styles.productDesk}>
      <header><div><i/><i/><i/></div><b>{title}</b><span>本地工作区 · 已保存</span><button>导出</button></header>
      {children}
    </div>
  </div>;
}

function MotionClip({clip, className=''}) {
  const merged = `${styles.motionAsset} ${className}`.trim();
  return clip.src.endsWith('.mp4')
    ? <video className={merged} src={asset(clip.src)} muted autoPlay loop playsInline preload="metadata" aria-label={clip.title}/>
    : <img className={merged} src={asset(clip.src)} alt={clip.title}/>;
}

function ProductScreen({type, focus, selectedModel='H3', onSelectModel=()=>{}}) {
  if(type==='overview') return <AppChrome><div className={styles.overviewScreen}>
    <section className={styles.overviewProject}><span>当前项目 / EP01</span><h4>Forbidden Bride · 海外短剧</h4><MotionClip clip={workbenchClips[0]}/><div><b>30 个镜头</b><b>身份 / 空间 / 首尾帧</b><b>9:16</b></div></section>
    <section className={styles.overviewRecent}><span>最近素材 · LIVE</span><div>{workbenchClips.map(x=><figure key={x.src}><MotionClip clip={x}/><small>{x.title}</small></figure>)}</div></section>
    <section className={`${styles.overviewQueue} ${focus==='任务队列'?styles.uiFocus:''}`}><span>生成任务</span><article><i/>H3 · R18 多参考 <b>68%</b></article><article><i/>图生图 · R19 修订 <b>排队</b></article><article><i/>FLUX · 角色定帧 <b>完成</b></article></section>
    <section className={`${styles.overviewModels} ${focus==='多模型'?styles.uiFocus:''}`}><span>模型状态</span><b><i/>H3 已加载</b><b><i/>FLUX 在线</b><b><i/>图生图待命</b></section>
  </div></AppChrome>;

  if(type==='canvas') return <AppChrome><div className={styles.fullCanvas}>
    <nav><button>T</button><button>▧</button><button>▷</button><button>♬</button><button>◇</button></nav>
    <main><div className={styles.canvasPreview}><MotionClip clip={workbenchClips[2]}/><button><Play/>预览镜头</button></div><MiniTimeline/></main>
    <aside className={focus==='多参考'?styles.uiFocus:''}><span>生成参数</span><label>创作模型</label><button>{selectedModel} <small>已加载</small></button><label>参考素材</label><div className={styles.refThumbs}>{workbenchClips.slice(0,3).map(x=><MotionClip key={x.src} clip={x}/>)}<b><Plus/></b></div><label>画面描述</label><p>主体从暗处醒来，镜头沿材质细节缓慢环绕。</p><button className={styles.runButton}><Sparkles/>加入本地队列</button></aside>
  </div></AppChrome>;

  if(type==='models') return <AppChrome title="选择创作模型"><div className={`${styles.modelScreen} ${focus==='多模型'?styles.uiFocus:''}`}>
    <div className={styles.modelFilter}><span>模型中心</span><button className={styles.filterOn}>全部</button><button>视频</button><button>文生图</button><button>图生图</button><i/><small>模型按任务路由 · 点击选择</small></div>
    <div className={styles.modelGrid}>{[
      ['H3','多参考视频','人物、空间与机位协同',workbenchClips[0],'已加载'],['FLUX','文生图','角色与场景设定',workbenchClips[5],'在线'],['IMAGE EDIT','图生图','服装、构图与连续性修订',workbenchClips[3],'在线'],['QWEN','语言模型','分镜与提示词助手',workbenchClips[1],'在线']
    ].map(([name,kind,desc,clip,state])=><button type="button" onClick={()=>onSelectModel(name)} className={selectedModel===name?styles.modelSelected:''} key={name}><MotionClip clip={clip}/><div><span>{kind}</span><b>{name}</b><p>{desc}</p><small><i/>{state}</small></div></button>)}</div>
  </div></AppChrome>;

  if(type==='references') return <AppChrome title="多参考素材板"><div className={`${styles.referenceScreen} ${focus==='多参考'?styles.uiFocus:''}`}>
    <div className={styles.refLines}/>{[['Elvira 身份',workbenchClips[5],'IDENTITY'],['走廊空间',workbenchClips[1],'SPACE'],['机位参考',workbenchClips[2],'VIEWPOINT'],['R18 首帧',workbenchClips[3],'START'],['R18 尾帧',workbenchClips[4],'END']].map(([title,clip,tag],i)=><article style={{'--x':`${8+i*17}%`,'--y':`${i%2?42:15}%`}} key={title}><MotionClip clip={clip}/><span>{tag}</span><b>{title}</b><small>拖动连接到 R18</small></article>)}<div className={styles.audioCard}><Volume2/><span>环境声轨</span><i/></div><div className={styles.refCore}><WandSparkles/><b>R18</b><small>5 个参考已连接</small></div>
  </div></AppChrome>;

  if(type==='timeline') return <AppChrome title="镜头编排"><div className={`${styles.timelineScreen} ${focus==='镜头编排'?styles.uiFocus:''}`}><div className={styles.timelinePlayer}><MotionClip clip={workbenchClips[3]}/><span>00:18:12 / 00:42:00</span></div><div className={styles.timelineTools}><button><Play/></button><b>12 个镜头</b><span>自动吸附</span><span>关键帧</span><i/></div><div className={styles.cinemaTimeline}>{['画面','提示词','声音'].map((track,row)=><section key={track}><b>{track}</b><div>{workbenchClips.concat(workbenchClips.slice(0,2)).map((x,i)=><article style={{'--w':`${110+(i%3)*36}px`}} key={`${track}-${i}`}>{row===0?<MotionClip clip={x}/>:<><small>{row===1?'镜头沿主体缓慢环绕':'氛围 · 机械低鸣'}</small></>}</article>)}</div></section>)}<i className={styles.playhead}/></div></div></AppChrome>;

  if(type==='queue') return <AppChrome title="本地渲染队列"><div className={`${styles.queueScreen} ${focus==='本地生成'||focus==='任务队列'?styles.uiFocus:''}`}><section className={styles.resourcePanel}><span>设备资源</span><div><b>GPU</b><i><em style={{width:'84%'}}/></i><small>84%</small></div><div><b>显存</b><i><em style={{width:'71%'}}/></i><small>17.2 GB</small></div><div><b>温度</b><i><em style={{width:'58%'}}/></i><small>62°C</small></div><p><i/>Siltok Station · 本地运行</p></section><section className={styles.queueList}><span>任务 / 06</span>{[['生成中','镜头 08 · H3','68%'],['等待','镜头 09 · H3','下一个'],['完成','角色定帧 · FLUX','查看'],['失败','镜头 04 · LTX','重试']].map(([state,title,meta],i)=><article data-state={state} key={title}><b>{String(i+1).padStart(2,'0')}</b><MotionClip clip={workbenchClips[i]}/><div><span>{state}</span><strong>{title}</strong>{i===0&&<i><em/></i>}</div><button>{state==='失败'?<RotateCcw/>:meta}</button></article>)}</section></div></AppChrome>;

  if(type==='recipe') return <AppChrome title="工作流配方"><div className={`${styles.recipeScreen} ${focus==='工作流复用'?styles.uiFocus:''}`}><section><span>配方 / CINEMA CHARACTER V04</span><h4>电影角色一致性工作流</h4><div className={styles.nodeGraph}>{['参考素材','提示词助手','图像模型','视频模型','清晰化','作品'].map((x,i)=><article key={x} style={{'--delay':i}}><small>0{i+1}</small><b>{x}</b><i/></article>)}</div></section><aside><Box/><b>保存为创作配方</b><p>模型、节点、参数、素材与版本将被一起保存。</p><div><span>6 个节点</span><span>8 个素材</span><span>12 项参数</span></div><button>保存工作流</button></aside></div></AppChrome>;

  return <AppChrome title="作品与素材库"><div className={styles.libraryScreen}><div className={styles.libraryBar}><b>视觉资产</b><button>全部</button><button>角色</button><button>场景</button><button>片段</button><span>48 项 · 本地</span></div><div className={styles.libraryWall}>{workbenchClips.concat(workbenchClips,workbenchClips.slice(0,2)).map((x,i)=><figure key={`${x.src}-${i}`} className={i%5===0?styles.libraryTall:''}><MotionClip clip={x}/><figcaption><b>{i%3===0?'角色资产':i%3===1?'场景版本':'镜头片段'} {String(i+1).padStart(2,'0')}</b><span>V{(i%4)+1} · 关联 {i+2} 个工作流</span></figcaption></figure>)}</div></div></AppChrome>;
}

function MiniTimeline(){return <div className={styles.miniTimeline}><div><button><Play/></button><span>00:08:14</span><i/></div><section>{workbenchClips.concat(workbenchClips.slice(0,2)).map((x,i)=><MotionClip key={`${x.src}-${i}`} clip={x}/>)}</section><em/></div>}

function CreationJourney() {
  const steps = [
    { title: '成片任务', tag: 'BRIEF', copy: '海外竖屏短剧《Forbidden Bride》：30 个镜头、统一角色与连续空间。', clip: workbenchClips[0], stat: 'EP01 · 9:16' },
    { title: '角色身份', tag: 'IDENTITY', copy: '把 Elvira 与 Lucas 的面部、发型和服装独立成身份参考，不让场景图承担全部控制。', clip: workbenchClips[5], stat: '2 个主角锚点' },
    { title: '空间与机位', tag: 'BLOCKING', copy: '同一走廊先锁空间结构，再用独立视点图约束景别、轴线与人物位置。', clip: workbenchClips[1], stat: 'SPACE + VIEWPOINT' },
    { title: '模型路由', tag: 'ROUTE', copy: '文生图建角色与场景，图生图修订连续性，H3 负责带多参考的镜头运动。', clip: workbenchClips[2], stat: 'IMAGE → EDIT → VIDEO' },
    { title: '首尾帧控制', tag: 'KEYFRAME', copy: '镜头从明确的起点发展到明确终点，动作、构图和空间关系都有可检查的落点。', clip: workbenchClips[3], stat: 'R18 · 0s → 15s' },
    { title: '生成与回看', tag: 'REVIEW', copy: '真实测试采用 5.2 秒片段先验证动作；复杂 15 秒镜头再拆段、换角度或减少变量。', clip: workbenchClips[0], stat: '5.2s 测试片 · 本地回看' },
  ];
  const [active, setActive] = useState(0);
  const current = steps[active];
  return <section className={styles.journey} id="visual-story">
    <div className={styles.journeyHead}><span>REAL PROJECT / 01</span><h2>不是功能清单。<br/>是一个短剧任务。</h2><p>所有画面来自《Forbidden Bride》的真实生产包；点击左侧查看输入如何变成镜头。</p></div>
    <div className={styles.productionFlow}>
      <div className={styles.flowRail}>{steps.map((step,i)=><button key={step.title} className={i===active?styles.flowOn:''} onClick={()=>setActive(i)}><span>{String(i+1).padStart(2,'0')}</span><b>{step.title}</b><small>{step.tag}</small></button>)}</div>
      <div className={styles.flowStage}><MotionClip key={current.clip.src} clip={current.clip}/><div className={styles.flowHud}><span>{current.tag} / ACTIVE</span><strong>{current.title}</strong><p>{current.copy}</p><b>{current.stat}</b></div><div className={styles.flowNodes}>{steps.map((_,i)=><i key={i} className={i<=active?styles.flowNodeOn:''}/>)}</div></div>
    </div>
  </section>;
}

function AdvantagesSection(){
  return <section className={styles.advantages} id="advantages">
    <div className={styles.evidenceIntro}><span>SILTOK / SYSTEM EVIDENCE</span><h2>真实任务跑得动，<br/>才是优势。</h2><p>速度、成本、系统工程、团队与市场窗口，放在同一条生产坐标里看。</p></div>
    <div className={styles.evidenceRail}>
      <article className={styles.evidenceProduction}><span>PRODUCTION</span><b>30 镜</b><strong>海外竖屏短剧生产包</strong><small>角色 · 空间 · 首尾帧 · H3 提示词</small></article>
      <article><span>SPEED</span><b>MODEL READY</b><strong>模型驻留，任务连续运行</strong><small>5.2 秒真实测试片 · 生成、重试与回看同队列</small></article>
      <article><span>COST</span><b>LOCAL</b><strong>高频试错不按次付费</strong><small>算力转为可复用的本地生产资产</small></article>
      <article><span>SYSTEM</span><b>16 → 120GB</b><strong>从“装不下”一侧求解</strong><small>内存生命周期 · 跨设备调度 · 稠密模型</small></article>
      <article><span>TEAM</span><b>HPC × AI</b><strong>系统与创作产品同队闭环</strong><small>白鹏 CEO · 沈游人 CTO</small></article>
      <article><span>MARKET GAP</span><b>32 / 192GB</b><strong>消费级 GPU 与数据中心显存</strong><small>RTX 5090 / NVIDIA B200 · 数据见来源</small></article>
    </div>
    <div className={styles.evidenceFooter}><div><i/>当前验证对象：短剧、动画、电商与 ComfyUI 工作流</div><div>资料来源：<a href="https://www.nvidia.com/en-gb/geforce/news/rtx-50-series-graphics-cards-gpu-laptop-announcements/" target="_blank" rel="noreferrer">NVIDIA RTX 5090</a><a href="https://www.nvidia.com/en-us/data-center/b200/" target="_blank" rel="noreferrer">NVIDIA B200</a></div></div>
  </section>;
}

function VisualStories() {
  const cards = [
    ['siltok-liquid-workflow.png','素材、参考与模型汇成同一条创作流','工作流不是配置文件，而是可以复用的创作资产。'],
    ['siltok-liquid-library.png','所有创作资产，都回到你的本地素材库','角色、场景、声音、色板与成片持续积累。'],
    ['siltok-creative-engine-hero.png','一台工作站，连接不断更新的影像世界','模型会变，创作系统持续生长。'],
    [showreel[0].poster,'从文字到动作','让叙事、角色与运镜共同发生。'],
    [showreel[3].poster,'从参考到世界','把风格、空间与气氛带进连续镜头。'],
  ];
  return <section className={styles.visualStories} id="visual-story"><div className={styles.visualStoryHead}><span>02 / VISUAL SYSTEM</span><h2>少一点说明。<br/>直接看创作如何流动。</h2></div><div className={styles.visualMarquee}><div>{[...cards,...cards].map(([src,title,copy],i)=><figure key={`${src}-${i}`} aria-hidden={i>=cards.length}><img src={asset(src)} alt={i<cards.length?title:''}/><figcaption><b>{title}</b><span>{copy}</span></figcaption></figure>)}</div></div></section>;
}

function Showreel() {
  const preview = (event, play) => {
    if (window.matchMedia('(hover:hover)').matches) play ? event.currentTarget.play().catch(()=>{}) : event.currentTarget.pause();
  };
  const expand = (event) => {
    if (event.currentTarget.requestFullscreen) event.currentTarget.requestFullscreen().catch(()=>{});
  };
  return <section className={styles.showreel} id="showreel">
    <div className={styles.compactReelHead}><span>SELECTED OUTPUTS</span><h2>生成样片</h2></div>
    <div className={styles.festivalReel}>{showreel.map((item,index)=><article key={item.src}><div className={styles.reelMedia}><video src={asset(item.src)} poster={asset(item.poster)} muted loop playsInline preload="metadata" onMouseEnter={e=>preview(e,true)} onMouseLeave={e=>preview(e,false)} onClick={expand}/><i>{String(index+1).padStart(2,'0')}</i><b>{item.title}</b><button onClick={e=>{e.stopPropagation();expand({currentTarget:e.currentTarget.parentElement.querySelector('video')})}}><Play/> 全屏</button></div></article>)}</div>
  </section>;
}

function ParticipationIntro() {
  return <section className={styles.participationIntro} id="co-create">
    <div><span>PART II · INVITATION</span><h2>产品介绍到这里。<br/>下面，是邀请共创。</h2></div>
    <p>产品能力、样片、系统与团队已经独立展示。只有当你确认它与你的创作场景相关，再进入申请流程。</p>
    <div className={styles.participationSteps}><article><span>01</span><b>了解计划</b><p>确认测试方式、任务边界与适合人群。</p></article><article><span>02</span><b>带来任务</b><p>选择一个真实、足够小、能够判断价值的任务。</p></article><article><span>03</span><b>提交申请</b><p>填写内测或生态合作信息，再由团队与你沟通。</p></article></div>
  </section>;
}

function TeamSection() {
  return <section className={styles.team} id="team">
    <div className={styles.companyIntro}><span>SILTOK LABS</span><h2>端侧 AI 基础设施，<br/>为创作者而造。</h2><p>硬件、高性能计算、扩散模型与创作产品能力，在同一支团队里闭环。</p><div className={styles.founderLine}><span><b>白鹏</b> CEO · 智能硬件与产品商业化</span><span><b>沈游人</b> CTO · 高性能计算与端侧 AI</span></div><div className={styles.talentNodes}><span>硬件</span><span>HPC</span><span>AI 模型</span><span>产品</span><span>内容产业</span></div></div>
    <div className={styles.teamCore} aria-label="Siltok 系统能力"><div><span>LOCAL VIDEO INFERENCE</span><strong><b>16</b>GB</strong><i>→</i><strong><b>120</b>GB</strong><small>从“装不下”这一侧求解</small></div><ul><li>内存生命周期</li><li>跨设备调度</li><li>稠密视频模型</li></ul></div>
    <div className={styles.marketPanel}><span>EDGE AI / TECH WINDOW</span><h3>消费级硬件与<br/>视频模型之间的缺口</h3><div className={styles.marketStats}><article><b>32GB</b><span>RTX 5090 GDDR7</span><small>1,792 GB/s 带宽</small></article><article><b>192GB</b><span>NVIDIA B200 HBM3e</span><small>数据中心级显存</small></article><article><b>8.19GB</b><span>Wan2.1 1.3B</span><small>5s 480p 基线</small></article><article><b>4–15s</b><span>MiniMax H3</span><small>24fps · 多模态参考</small></article></div><div className={styles.marketGap}><i/><span>同一个视频任务</span><b>显存差距，就是系统工程的入口。</b></div><small className={styles.sourceNote}>来源：<a href="https://www.nvidia.com/en-gb/geforce/news/rtx-50-series-graphics-cards-gpu-laptop-announcements/" target="_blank" rel="noreferrer">NVIDIA</a> · <a href="https://github.com/Wan-Video/Wan2.1/blob/main/README.md" target="_blank" rel="noreferrer">Wan2.1</a> · <a href="https://www.minimax.io/news/minimax-h3-open-source" target="_blank" rel="noreferrer">MiniMax H3</a></small></div>
  </section>;
}

function CoCreatePage() {
  return <main className={`${styles.page} ${styles.coCreatePage}`}>
    <header className={styles.nav}><a href={asset('index.html')} className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok"/><span>LABS</span></a><nav><a href={asset('index.html#creator-canvas')}>产品画布</a><a href="#program">测试计划</a><a href="#apply">申请入口</a></nav><a className={styles.navCta} href={asset('index.html')}>返回产品页 <ArrowRight/></a></header>
    <section className={styles.coCreateHero}><img src={asset('siltok-liquid-library.png')} alt="Siltok 创作资产库"/><div className={styles.networkIntro}><span>SILTOK CREATOR NETWORK</span><h1>创作者得到的，<br/>不只是一台设备。</h1><p>项目、资源、工作流与设备，共同进入真实生产。</p><a href="#apply">加入早期名单 <ArrowRight/></a></div><div className={styles.networkBoard}><div className={styles.networkCore}>SILTOK<small>CREATOR NETWORK</small></div><article><span>01</span><b>AI 内容与商业项目</b><small>BRIEF · PRODUCTION · DELIVERY</small></article><article><span>02</span><b>平台、技术与发行资源</b><small>PLATFORM · SERVICE · DISTRIBUTION</small></article><article><span>03</span><b>本地设备 + ComfyUI 共创</b><small>DEVICE · WORKFLOW · TEST</small></article><div className={styles.betaNode}><i/>真实生产场景 · 少量内测席位</div></div></section>
    <BetaProgram />
    <section className={visual.connectBar} id="apply"><img src={asset('enterprise-wechat-shigenjie-20260904.png')} alt="石根洁的企业微信二维码"/><div><p>STEP 01 · CONNECT</p><h2>先添加企业微信。</h2><span>发送你的创作方向，我们会先确认产品与任务是否匹配。</span></div><div><a href={APPLY_URL} target="_blank" rel="noreferrer"><span><b>02</b> 内测申请</span><small>带一个真实任务体验产品</small><ArrowRight/></a><a className={visual.commerceLink} href={COLLAB_URL} target="_blank" rel="noreferrer"><span><b>03</b> 商单生态合作</span><small>提交团队资料与合作方向</small><ArrowRight/></a></div></section>
    <section className={styles.apply}><div><p>THREE STEPS · TWO OPTIONS</p><h2>先建立联系，<br/>再选择参与方式。</h2><span>添加企微是统一入口；内测申请与生态合作可以任选其一，也可以同时提交。</span><div className={visual.choiceNote}>02 / 03 按需选择</div></div><div className={styles.applyCards}><div className={styles.qrMini}><span className={visual.stepBadge}>01 · 添加企微</span><img src={asset('enterprise-wechat-shigenjie-20260904.png')} alt="石根洁的企业微信二维码"/><b>石根洁 · 硅基词元</b></div><div className={styles.qrMini}><span className={visual.stepBadge}>01 · 添加企微</span><img src={asset('enterprise-wechat-linan-20260909.png')} alt="李楠的企业微信二维码"/><b>李楠 · 硅基词元</b></div><div className={`${styles.applyCard} ${visual.betaCard}`}><span className={visual.stepBadge}>02 · 内测申请</span><FileCheck2/><h3>参与产品内测</h3><p>填写真实任务、当前工具与可参与时间。</p><a href={APPLY_URL} target="_blank" rel="noreferrer">填写内测申请 <ArrowRight/></a></div><div className={`${styles.applyCard} ${visual.commerceCard}`}><span className={visual.stepBadge}>03 · 商单生态合作</span><MessageSquareText/><h3>提交合作报价</h3><p>填写账号、团队资料与合作方向。</p><a href={COLLAB_URL} target="_blank" rel="noreferrer">填写合作报价 <ArrowRight/></a></div></div></section>
    <footer><a href={asset('index.html')} className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok"/><span>LABS</span></a><p>北京硅基词元科技有限公司 · 邀请共创</p><div><a href={asset('index.html')}>返回产品页</a></div></footer>
  </main>;
}

function BetaProgram() {
  return <>
    <section className={styles.valueStrip}><p>可选的产品共创计划</p><div><LockKeyhole/><b>素材在本地处理</b><span>未发布内容与创作资产更可控</span></div><div><Workflow/><b>工作流可沉淀</b><span>把成功参数和失败经验留下来</span></div><div><MessageSquareText/><b>反馈直接进入迭代</b><span>围绕真实任务确定产品边界</span></div></section>
    <section className={styles.program} id="program"><SectionHead n="01" label="BETA PROGRAM" title="带一个真实任务，完成最小测试闭环。" copy="在约定的 3 天窗口内根据自己的时间自由测试，不要求连续在线；围绕一个明确问题留下可复现的结论。" /><div className={styles.weekGrid}>{testDays.map(([day,title,copy])=><article key={day}><b>{day}</b><h3>{title}</h3><p>{copy}</p></article>)}</div><div className={styles.exchange}><div><span>我们提供</span><ul><li><Check/>现场或远程测试环境</li><li><Check/>安装与操作引导</li><li><Check/>定向案例与问题响应</li><li><Check/>适合时共同沉淀模板</li></ul></div><div><span>参与者提供</span><ul><li><Check/>一个最小测试任务</li><li><Check/>3 天内按自己的时间自由测试</li><li><Check/>问题、失败样本与判断标准</li><li><Check/>结束后的简短反馈</li></ul></div></div></section>
    <section className={styles.tasks} id="tasks"><SectionHead n="02" label="TEST TASKS" title="真实项目为主，统一案例为辅。" copy="真实任务判断产品是否有用；统一案例让不同创作者的结果可以比较。具体模型、输入和交付规格在入选后确认。" /><div className={styles.taskSplit}><article><b>主任务</b><h3>真实项目测试</h3><p>带入一个正在发生的业务任务，完成从输入素材到结果导出的最小流程。</p><ul><li>记录原有方案与判断基线</li><li>保留成功结果与失败样本</li><li>判断结果是否达到你的可用标准</li><li>确认是否值得继续沉淀为模板</li></ul></article><article><b>对照组</b><h3>定向场景测试</h3><p>使用统一输入和步骤测试关键能力，建立跨用户可比较的数据。</p><ul><li>统一素材与输出规格</li><li>保留原始输出</li><li>标注可接受、需返工和不可用</li><li>记录异常复现路径</li></ul></article></div><div className={styles.caseGrid}>{directedCases.map(({n,icon:Icon,title,copy})=><article key={n}><div><span>{n}</span><Icon/></div><h3>{title}</h3><p>{copy}</p></article>)}</div><div className={styles.boundary}><CircleHelp/><p><b>测试边界：</b>产品仍处于研发共创阶段，不承诺所有任务都优于云端或一次生成即可商用。我们更希望用真实数据确认“适合什么、不适合什么”。</p></div></section>
    <section className={styles.ecosystem} id="ecosystem"><SectionHead n="03" label="CREATOR ECOSYSTEM" title="让不同创作角色，验证不同问题。" copy="右侧为首阶段建议招募结构，并非现有用户统计。比例会根据报名质量、产品阶段和测试资源动态调整。" /><div className={styles.ecoBody}><div className={styles.donut}><div><b>100%</b><span>创作者共创</span></div></div><div className={styles.legend}>{ecosystem.map(([name,pct,color])=><div key={name}><i style={{background:color}}/><span>{name}</span><b>{pct}</b></div>)}</div></div></section>
  </>;
}

function ProductFAQ() {
  const [active, setActive] = useState(0);
  return <section className={styles.faqSection} id="questions"><div className={styles.questionRouter}><div className={styles.questionList}><p>PRODUCT QUESTIONS</p><h3>你可能正在问——</h3>{userQuestions.map(([question],i)=><button className={i===active?styles.activeQuestion:''} key={question} onClick={()=>setActive(i)}><span>{String(i+1).padStart(2,'0')}</span>{question}<ArrowRight/></button>)}</div><article className={styles.answerPanel}><span>ANSWER / {String(active+1).padStart(2,'0')}</span><h3>{userQuestions[active][0]}</h3><p>{userQuestions[active][1]}</p><div><a href="#creator-canvas">查看创作画布 <ArrowRight/></a><a href="#wechat">沟通你的场景</a></div><small>产品仍处于共创阶段；配置、模型能力和测试范围以实际确认结果为准。</small></article></div></section>;
}
