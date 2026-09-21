import { useEffect, useState } from 'react';
import { ArrowRight, Check, CircleHelp, Cpu, FileCheck2, Film, Image as ImageIcon, Layers3, LockKeyhole, MessageSquareText, MonitorUp, ShieldCheck, Workflow } from 'lucide-react';
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

  return <main className={styles.page}>
    <header className={styles.nav}>
      <a href="#top" className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok" /><span>LABS</span></a>
      <nav><a href="#product-overview">产品总览</a><a href="#showreel">生成样片</a><a href="#product-details">系统架构</a><a href="#creator-canvas">创作画布</a><a href="#team">团队</a></nav>
      <a className={styles.navCta} href="#co-create">邀请共创 <ArrowRight /></a>
    </header>

    <section className={styles.hero} id="top">
      <div className={styles.heroBackdrop} aria-hidden="true"><img src={asset('siltok-creative-engine-hero.png')} alt=""/></div>
      <div className={styles.heroAura} aria-hidden="true"><i/><i/><i/></div>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}><i/> DESKTOP AI STATION · LOCAL CREATIVE SYSTEM</p>
        <h1>Siltok<br/><em>AI Station.</em></h1>
        <h2>把开源模型与工作流，带回创作者桌面。</h2>
        <p className={styles.lead}>硬件、模型环境与创作画布组成同一套本地系统。它不只完成一次生成，也让素材、节点和成功流程持续留下来。</p>
        <div className={styles.actions}><a className={styles.primary} href="#showreel">浏览生成样片 <ArrowRight /></a><a className={styles.secondary} href="#product-details">了解系统</a></div>
      </div>
      <div className={styles.heroMedia}>
        <div className={styles.glassEyebrow}><span>LOCAL CREATIVE CORE</span><b>STATION / 01</b></div>
        <div className={styles.deviceHalo}/>
        <img className={styles.heroDevice} src={asset('siltok-ai-station-perspective.png')} alt="Siltok AI Station 产品"/>
        <div className={`${styles.glassChip} ${styles.glassChipOne}`}><i/>模型环境 <b>READY</b></div>
        <div className={`${styles.glassChip} ${styles.glassChipTwo}`}>素材处理 <b>LOCAL</b></div>
        <div className={`${styles.glassChip} ${styles.glassChipThree}`}>工作流 <b>REUSABLE</b></div>
        <p><i/>正在运行 · 本地创作系统</p>
      </div>
      <div className={styles.heroFacts}><div><b>LOCAL</b><span>素材与项目留在本地</span></div><div><b>OPEN</b><span>模型与节点持续扩展</span></div><div><b>REUSABLE</b><span>工作流成为创作资产</span></div></div>
    </section>

    <div className={styles.signalRail} aria-label="Siltok 本地创作流程"><div><span>01 / MODEL READY</span><span>02 / NODE GRAPH</span><span>03 / LOCAL ASSETS</span><span>04 / RENDER QUEUE</span><span>05 / REUSABLE WORKFLOW</span><span>01 / MODEL READY</span><span>02 / NODE GRAPH</span><span>03 / LOCAL ASSETS</span><span>04 / RENDER QUEUE</span><span>05 / REUSABLE WORKFLOW</span></div></div>

    <ProductOverview />
    <Showreel />
    <ProductDetails />
    <CanvasExperience />
    <TeamSection />
    <ParticipationIntro />
    <BetaProgram />
    <ProductFAQ />
    <section className={visual.connectBar} id="wechat"><img src={asset('enterprise-wechat-shigenjie-20260904.png')} alt="石根洁的企业微信二维码"/><div><p>CONTACT · WHEN YOU ARE READY</p><h2>看懂产品之后，再决定是否参与。</h2><span>添加企业微信，发送你的创作方向。我们会先确认产品与需求是否匹配，再安排测试或合作沟通。</span></div><div><a href={APPLY_URL} target="_blank" rel="noreferrer"><span><b>01</b> 内测申请</span><small>带一个真实任务体验产品</small><ArrowRight/></a><a className={visual.commerceLink} href={COLLAB_URL} target="_blank" rel="noreferrer"><span><b>02</b> 商单生态合作</span><small>提交账号、团队资料与合作方向</small><ArrowRight/></a></div></section>

    <section className={styles.apply}><div><p>THREE STEPS · TWO OPTIONS</p><h2>先建立联系，<br/>再选择参与方式。</h2><span>第一步添加企微是统一入口。第二步和第三步可以任选其一，也可以同时填写：参与产品测试请提交内测申请；有商单、账号或生态资源请提交合作报价。</span><div className={visual.choiceNote}>02 / 03 按需选择 · 可同时填写</div></div><div className={styles.applyCards}><div className={styles.qrMini}><span className={visual.stepBadge}>01 · 添加企微</span><img src={asset('enterprise-wechat-shigenjie-20260904.png')} alt="石根洁的企业微信二维码"/><b>石根洁 · 硅基词元</b></div><div className={styles.qrMini}><span className={visual.stepBadge}>01 · 添加企微</span><img src={asset('enterprise-wechat-linan-20260909.png')} alt="李楠的企业微信二维码"/><b>李楠 · 硅基词元</b></div><div className={`${styles.applyCard} ${visual.betaCard}`}><span className={visual.stepBadge}>02 · 内测申请</span><FileCheck2/><h3>参与产品内测</h3><p>请创作者填写真实任务、当前工具与可参与时间。</p><a href={APPLY_URL} target="_blank" rel="noreferrer">填写内测申请 <ArrowRight/></a></div><div className={`${styles.applyCard} ${visual.commerceCard}`}><span className={visual.stepBadge}>03 · 商单生态合作</span><MessageSquareText/><h3>提交合作报价</h3><p>请创作者填写账号信息，并上传团队介绍、媒体资料包与报价文件。</p><a href={COLLAB_URL} target="_blank" rel="noreferrer">填写合作报价 <ArrowRight/></a></div></div></section>

    <footer><a href="#top" className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok"/><span>LABS</span></a><p>北京硅基词元科技有限公司 · Siltok Labs AI 创作共创社区</p><div><a href={OFFICIAL_URL} target="_blank" rel="noreferrer">产品官网</a><a href={APPLY_URL} target="_blank" rel="noreferrer">申请内测</a><a href={COLLAB_URL} target="_blank" rel="noreferrer">商单合作</a></div></footer>
  </main>;
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
  return <section className={styles.canvasSection} id="creator-canvas">
    <SectionHead n="UI" label="SILTOK CREATOR" title="把复杂工作流，收进一张创作画布。" copy="创作者面向作品做决策，系统在背后组织模型、节点、素材与任务。" />
    <div className={styles.canvasWindow}>
      <div className={styles.canvasTop}><b>Siltok Creator</b><span>创作中心</span><span>我的作品</span><span>素材库</span><i>LOCAL</i></div>
      <div className={styles.canvasBody}>
        <aside><button className={styles.canvasToolOn}>▷<small>视频</small></button><button>▧<small>图片</small></button><button>T<small>文字</small></button><button>□<small>作品</small></button></aside>
        <div className={styles.canvasStage}><div className={styles.canvasStageHead}><b>视频预览</b><span>画布 · 项目自动保存</span></div><video src={asset(showreel[2].src)} poster={asset(showreel[2].poster)} autoPlay muted loop playsInline preload="metadata"/><div className={styles.canvasTimeline}><i/><i/><i/><i/></div></div>
        <div className={styles.canvasControls}><span>VIDEO WORKFLOW</span><h3>视频生成</h3><label>创作模型</label><div className={styles.canvasSelect}>MiniMax H3 <b>⌄</b></div><label>生成方式</label><div className={styles.canvasModes}><b>文生视频</b><span>图片生成视频</span><span>参考素材生成</span></div><label>画面描述</label><p>描述人物、场景、动作与镜头，或交给提示词助手整理。</p><label>输出规格</label><div className={styles.canvasChips}><b>16:9</b><span>768p</span><span>多条生成</span></div><button className={styles.generateButton}>开始生成 <ArrowRight/></button></div>
      </div>
    </div>
    <div className={styles.canvasFoot}><div><b>一个入口</b><span>文字、图片、视频与作品资产在同一画布流转。</span></div><div><b>按任务选模型</b><span>模型是能力模块，不是用户必须理解的技术负担。</span></div><div><b>工作流可复用</b><span>参考素材、规格与生成记录持续留在项目里。</span></div><a href={CREATOR_PROTOTYPE_URL} target="_blank" rel="noreferrer">打开交互原型 <ArrowRight/></a></div>
  </section>;
}

function Showreel() {
  const [page, setPage] = useState(0);
  const visible = showreel.slice(page * 2, page * 2 + 2);
  return <section className={styles.showreel} id="showreel">
    <SectionHead n="01" label="SELECTED OUTPUTS" title="生成样片浏览器。" copy="像参考项目页一样，把作品放到参数之前：每次并排浏览两个案例，再查看它们各自验证的画面能力。" />
    <div className={styles.reelBrowser}>
      <div className={styles.reelBrowserHead}><div><span>04 SELECTED EXAMPLES</span><h3>先看作品，再谈系统。</h3></div><div className={styles.reelPager}><button onClick={()=>setPage(0)} disabled={page===0} aria-label="上一组样片">←</button><span>EXAMPLES {String(page*2+1).padStart(2,'0')} + {String(page*2+2).padStart(2,'0')}<small>PAGE 0{page+1} / 02</small></span><button onClick={()=>setPage(1)} disabled={page===1} aria-label="下一组样片">→</button></div></div>
      <div className={styles.reelGrid} key={page}>{visible.map((item,i)=>{const index=page*2+i;return <article key={item.src}><div className={styles.reelTitle}><span>EXAMPLE {String(index+1).padStart(2,'0')}</span><h3>{item.title}</h3><b>SILTOK TEST OUTPUT</b></div><div className={styles.reelMeta}>{item.meta.map(x=><span key={x}>{x}</span>)}</div><div className={styles.reelMedia}><video src={asset(item.src)} poster={asset(item.poster)} controls muted loop playsInline preload="metadata"/><span>LOCAL WORKFLOW</span><i>{String(index+1).padStart(2,'0')} / 04</i></div><details><summary><span>＋</span> 查看展示重点 <small>{item.copy}</small></summary><p>{item.detail}</p></details></article>})}</div>
    </div>
    <p className={styles.reelNote}>页面展示为产品测试样片；生成效果会随模型、输入素材与工作流配置变化。</p>
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
    <SectionHead n="05" label="CORE TEAM" title="从硬件产品，到端侧 AI 与软件生态。" copy="核心团队覆盖智能硬件、互联网商业化、高性能计算与企业软件实践。" />
    <div className={styles.teamGrid}>
      <article><div><span>创始人 & CEO</span><b>白鹏</b></div><p>20 年以上科技、互联网与智能硬件行业管理经验，覆盖 AI 硬件、软件生态与商业化全链路。曾任爱奇艺 AI 硬件公司 CEO、小米集团政企部副总裁、小米集团商业部总经理、小米集团互联网四部总经理、小米电视副总裁、迅雷总经理。</p><small>曾推动小米互联网月度收入突破 10 亿元、年度互联网收入突破 200 亿元；负责小米电视、小米盒子、小爱音箱等产品线，推动相关出货量、系统用户量与 OTT 收入达到中国第一。</small></article>
      <article><div><span>联合创始人 & CTO</span><b>沈游人</b></div><p>北京硅基词元科技有限公司联合创始人兼 CTO，北京海致科技有限公司联合创始人兼 CTO，清华大学计算机系高性能研究所成员。</p><small>长期从事高性能计算、企业软件与技术平台建设，负责 Siltok 端侧 AI 技术与产品工程方向。</small></article>
    </div>
  </section>;
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
