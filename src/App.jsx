import { useState } from 'react';
import { ArrowRight, Check, CircleHelp, Cpu, FileCheck2, Film, Image as ImageIcon, Layers3, LockKeyhole, MessageSquareText, MonitorUp, ShieldCheck, Workflow } from 'lucide-react';
import styles from './station.module.css';
import visual from './product-visual.module.css';

const APPLY_URL = 'https://my.feishu.cn/share/base/shrcnVgo3Gj2zxuRtMYljrAmozd';
const COLLAB_URL = 'https://my.feishu.cn/share/base/shrcn63I30xlVeGwwS1aRNVMm7b';
const OFFICIAL_URL = 'https://siltok-ai.com/products/ai-station';

const directedCases = [
  { n: '01', icon: ImageIcon, title: '人物立绘', copy: '固定提示词与尺寸生成单人全身立绘，记录可用率、细节问题与返工次数。' },
  { n: '02', icon: Film, title: '图生视频镜头', copy: '用统一参考图完成短镜头，记录动作、稳定性、生成时长与失败模式。' },
  { n: '03', icon: Layers3, title: '角色一致性', copy: '同一角色完成多个景别或连续镜头，判断身份、服饰和画面风格是否稳定。' },
  { n: '04', icon: Workflow, title: 'ComfyUI 工作流', copy: '导入指定或自有工作流，检查节点依赖、执行过程、结果与复现条件。' },
  { n: '05', icon: MonitorUp, title: '批量与异常恢复', copy: '连续执行一组任务，记录中断、报错、恢复方式和对日常生产的影响。' },
];

const week = [
  ['DAY 0', '确认与准备', '完成报名、能力匹配、保密协议与测试排期'],
  ['DAY 1-2', '上手与定向测试', '完成安装引导和 1-2 个统一测试案例'],
  ['DAY 3-5', '真实任务迁移', '用自己的项目跑通一个最小可复现工作流'],
  ['DAY 6', '问题复盘', '整理失败样本、操作卡点与能力边界'],
  ['DAY 7', '30 分钟访谈', '确认质量标准、继续测试意愿与后续共创方向'],
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
  ['业务资产形成壁垒', '真正可复用的是素材、角色设定、提示词、节点组合、参数配置和质量判断标准，而不只是一次生成结果。'],
];

const capabilityStages = [
  ['当前重点', '本地运行环境、ComfyUI 节点部署、模型与依赖管理、工作流测试和创作资产留存。'],
  ['正在验证', '不同模型的加载与精度表现、复杂工作流稳定性、批量任务、长时运行和失败恢复。'],
  ['不做预先承诺', '不承诺所有任务快于云端、不承诺所有开源模型可用，也不承诺一次生成即可达到精品成片标准。'],
];

const techAdvantages = [
  ['01', '桌面级本地 AI 工作站', '它不是在线生成网站，而是一台承载模型、节点、素材与工作流的独立设备。'],
  ['02', '模型运行与资源协同', '围绕 GPU、内存、存储和模型加载进行系统级适配，降低创作者自行配环境的门槛。'],
  ['03', '不靠牺牲精度换速度', '技术路径不以简单压缩模型作为加速前提；不同模型的精度、速度与稳定性仍在逐项实测。'],
  ['04', '开放 ComfyUI 生态', '支持部署 ComfyUI 节点和自有工作流，不把用户锁在单一模型或固定模板里。'],
];

const userQuestions = [
  ['这到底是什么产品？', 'Siltok AI Station 是一台面向本地 AI 部署与创作工作流的桌面主机。它把模型环境、ComfyUI 节点、素材和任务运行放在同一台设备上管理，不是单独的视频模型，也不只是一个网页平台。'],
  ['内测免费吗？在哪里使用？', '入选当前内测后，约定范围内不收取设备测试使用费。测试以公司现场或远程连接 Siltok 测试设备为主，不要求你把模型安装到自己的电脑；如涉及第三方付费 API，会在测试前单独说明。'],
  ['我的电脑或 Mac 能带动吗？', '参加远程内测时，主要算力由 Siltok 测试设备承担，你的 Mac 或普通电脑用于远程连接和操作即可。未来如需部署到自有设备，则要根据模型、显存和工作流单独评估。'],
  ['这是做 AI 视频的模型吗？', '不是单一的视频模型。Siltok 提供本地模型运行与工作流环境，可按场景配置图像、视频、超分和 ComfyUI 工作流。具体可用模型与效果，以当期测试环境为准。'],
  ['优势只是算力价格更低吗？', '成本是一个验证维度，但不是唯一价值。更核心的是素材本地留存、减少云端排队和平台绑定、工作流可复现，以及模型与节点可按业务调整。是否比云端更省，需要用你的真实任务测算。'],
  ['H3 不如其他云端模型怎么办？', '我们不要求所有任务只用一个模型。本地与云端可以协同：不同模型负责更擅长的环节。内测正是要确认真人、动画、电商等场景分别适合什么模型，以及哪些任务现阶段仍应使用云端。'],
  ['支持超分和 ComfyUI 节点吗？', '支持围绕 ComfyUI 节点和工作流进行部署。超分可作为具体项目的测试环节，但模型、节点版本和资源占用需要在排期前确认，不默认承诺所有插件一次兼容。'],
  ['我现在项目忙，能晚点参加吗？', '可以。你可以先登记方向，等测试环境和时间匹配后再加入；也可以先做一次 20–30 分钟远程体验，不需要立刻迁移完整项目。'],
  ['电商团队可以怎么测试？', '可以从商品图批量变体、场景替换、短视频镜头、超分或一条现有 ComfyUI 流程开始。我们会先确认产量、可用率和返工标准，再安排最小测试任务。'],
  ['测试期间还有其他费用吗？', '约定的内测设备使用本身免费，不会自动转为付费服务。测试时长、支持范围以及可能产生的第三方模型或 API 费用，会在开始前书面确认。'],
];

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function App() {
  return <main className={styles.page}>
    <header className={styles.nav}>
      <a href="#top" className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok" /><span>LABS</span></a>
      <nav><a href="#product-overview">产品与技术</a><a href="#questions">常见问题</a><a href="#program">内测说明</a><a href="#ecosystem">创作者生态</a><a href="#team">团队</a></nav>
      <a className={styles.navCta} href="#wechat">添加企业微信 <ArrowRight /></a>
    </header>

    <section className={styles.hero} id="top">
      <div className={visual.heroRail} aria-hidden="true"><span>MODEL</span><i/><span>NODE</span><i/><span>WORKFLOW</span><i/><span>OUTPUT</span></div>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>SILTOK LABS · CREATOR CO-CREATION</p>
        <h1>把开源模型与工作流，<br/><em>带回创作者桌面。</em></h1>
        <p className={styles.lead}>Siltok AI Station 面向需要本地处理素材、持续生成和复用工作流的创作者与团队。我们把模型环境、ComfyUI 节点和任务执行整合为一套可维护的本地创作底座——它不是所有云端工具的替代品，而是隐私、稳定生产和深度定制之外的另一种选择。</p>
        <div className={styles.actions}><a className={styles.primary} href="#wechat">第一步 · 添加企业微信 <ArrowRight /></a><a className={styles.secondary} href={APPLY_URL} target="_blank" rel="noreferrer">产品内测申请</a><a className={styles.secondary} href={COLLAB_URL} target="_blank" rel="noreferrer">商单 / 生态合作</a></div>
        <div className={styles.heroNote}><ShieldCheck /><span>技术、运营、产品团队为你服务，先确认真实需求和当前产品是否匹配，再安排测试。</span></div>
      </div>
      <div className={styles.heroPanel}>
        <div className={styles.panelTop}><span>SILTOK AI STATION</span><span>LOCAL CREATIVE INFRASTRUCTURE</span></div>
        <div className={visual.deviceStage}><img src={asset('siltok-ai-station-perspective.png')} alt="Siltok AI Station 桌面级本地 AI 工作站"/><div className={visual.stageCaption}><b>一台设备，承载你的本地创作环境。</b><span>模型 · ComfyUI 节点 · 素材 · 工作流</span></div><span className={visual.stageNode}>01 / LOCAL</span><span className={visual.stageNode}>02 / OPEN</span></div>
        <div className={styles.panelStats}><div><b>本地</b><span>创作资产处理</span></div><div><b>开放</b><span>模型与节点扩展</span></div><div><b>共创</b><span>工作流沉淀</span></div></div>
      </div>
    </section>

    <ProductOverview />

    <section className={visual.connectBar} id="wechat"><img src={asset('enterprise-wechat-shigenjie-20260904.png')} alt="石根洁的企业微信二维码"/><div><p>STEP 01 · CONNECT</p><h2>第一步，添加企业微信。</h2><span>添加后发送你的创作方向，技术、运营、产品团队将共同为你服务。第二步与第三步按需选择，也可以同时填写。</span></div><div><a href={APPLY_URL} target="_blank" rel="noreferrer"><span><b>02</b> 内测申请</span><small>请创作者填写内测申请</small><ArrowRight/></a><a className={visual.commerceLink} href={COLLAB_URL} target="_blank" rel="noreferrer"><span><b>03</b> 商单生态合作</span><small>请创作者填写合作报价</small><ArrowRight/></a></div></section>

    <section className={styles.valueStrip}><p>这不是一次“随便体验”</p><div><LockKeyhole/><b>素材在本地处理</b><span>未发布内容与创作资产更可控</span></div><div><Workflow/><b>工作流可沉淀</b><span>把成功参数和失败经验留下来</span></div><div><MessageSquareText/><b>反馈直接进入迭代</b><span>围绕真实任务确定产品边界</span></div></section>

    <section className={styles.program} id="program">
      <SectionHead n="01" label="BETA PROGRAM" title="一周完成一个最小测试闭环。" copy="测试不是追求功能全部跑一遍，而是围绕一个明确痛点和一个真实项目，留下可复现的结论。" />
      <div className={styles.weekGrid}>{week.map(([day,title,copy])=><article key={day}><b>{day}</b><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <div className={styles.exchange}><div><span>我们提供</span><ul><li><Check/>现场或远程测试环境</li><li><Check/>安装与操作引导</li><li><Check/>定向案例与问题响应</li><li><Check/>适合时共同沉淀模板</li></ul></div><div><span>参与者提供</span><ul><li><Check/>一个真实业务任务</li><li><Check/>每周至少 1-2 小时</li><li><Check/>问题、失败样本与判断标准</li><li><Check/>结束后的结构化访谈</li></ul></div></div>
    </section>

    <section className={styles.tasks} id="tasks">
      <SectionHead n="02" label="TEST TASKS" title="70% 真实项目，30% 统一案例。" copy="真实任务判断产品是否有用；统一案例让不同创作者的结果可以比较。具体模型、输入和交付规格在入选后确认。" />
      <div className={styles.taskSplit}><article><b>60-70%</b><h3>真实项目测试</h3><p>带入一个正在发生的业务任务，完成从输入素材到结果导出的最小流程。</p><ul><li>记录原有方案、时间与成本基线</li><li>记录生成时长、成功率、返工与失败原因</li><li>判断结果是否达到你的可用标准</li><li>确认是否值得继续沉淀为模板</li></ul></article><article><b>30-40%</b><h3>定向场景测试</h3><p>使用统一输入和步骤测试关键能力，建立跨用户可比较的数据。</p><ul><li>统一素材与输出规格</li><li>保留原始输出，不只提交最好结果</li><li>标注可接受、需返工和不可用</li><li>记录操作门槛与异常复现路径</li></ul></article></div>
      <div className={styles.caseGrid}>{directedCases.map(({n,icon:Icon,title,copy})=><article key={n}><div><span>{n}</span><Icon/></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <div className={styles.boundary}><CircleHelp/><p><b>测试边界：</b>产品仍处于研发共创阶段，不承诺所有任务都比云端更快或一次生成即可商用。我们更希望用真实数据确认“适合什么、不适合什么”。</p></div>
    </section>

    <section className={styles.ecosystem} id="ecosystem">
      <SectionHead n="03" label="CREATOR ECOSYSTEM" title="让不同创作角色，验证不同问题。" copy="右侧为首阶段建议招募结构，并非现有用户统计。比例会根据报名质量、产品阶段和测试资源动态调整。" />
      <div className={styles.ecoBody}><div className={styles.donut}><div><b>100%</b><span>创作者共创</span></div></div><div className={styles.legend}>{ecosystem.map(([name,pct,color])=><div key={name}><i style={{background:color}}/><span>{name}</span><b>{pct}</b></div>)}</div></div>
    </section>

    <section className={styles.products} id="product-details">
      <SectionHead n="04" label="SILTOK AI STATION" title="模型会变，工作流会留下来。" copy="AI 视频正在从一次生成结果，走向可持续运行的生产系统。Siltok 的重点不是把某个模型装进机器，而是让本地模型、节点、素材和任务更容易管理与复用。" />
      <div className={visual.logicBlock}><div className={visual.logicLead}><span>FROM MODEL TO SYSTEM</span><h3>开源降低了模型门槛，<br/>工程和业务资产决定长期价值。</h3><p>参考实时视频、长视频推理和本地工作站的发展方向，我们把与 Siltok 直接相关的判断拆成三层。</p></div><div className={visual.logicGrid}>{productLogic.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h4>{title}</h4><p>{copy}</p></article>)}</div></div>
      <div className={visual.sceneIntro}><div><span>CREATOR COVERAGE</span><h3>从个人创作到专业制作团队</h3><p>覆盖八类高频内容生产场景，重点验证真实项目中的稳定性、可控性与工作流复用价值。</p></div><div className={visual.sceneGrid}>{creatorScenes.map(([title,copy])=><article key={title}><b>{title}</b><span>{copy}</span></article>)}</div></div>
      <div className={visual.productShowcase}><div><span>DESKTOP LOCAL AI</span><h3>为创作者设计的<br/>桌面级 AI Station</h3><p>紧凑机身承载本地模型、ComfyUI 节点与可复用工作流。产品仍处于内测共创阶段，实际能力以测试环境为准。</p></div><img src={asset('siltok-ai-station-perspective.png')} alt="Siltok AI Station 产品透视图"/></div>
      <div className={styles.productGrid}>{products.map((p,i)=><article key={p.name}><div className={styles.productTop}><Cpu/><span>{p.label}</span><b>0{i+1}</b></div><h3>{p.name}</h3><p>{p.copy}</p><ul>{p.points.map(x=><li key={x}><Check/>{x}</li>)}</ul></article>)}</div>
      <div className={visual.valueGrid}>{localValues.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><b>{title}</b><p>{copy}</p></article>)}</div>
      <div className={visual.techStrip}><div><span>研发方向 · 资源协同</span><b>探索 CPU、GPU、内存与存储之间更有效的模型加载和任务调度</b></div><div><span>研发方向 · 推理优化</span><b>在实际硬件边界内验证精度、速度、稳定性与资源占用的平衡</b></div><div><span>产品方向 · 流程管理</span><b>把模型、节点、素材、任务记录与反馈组织成可复用的生产流程</b></div></div>
      <div className={visual.stageBlock}><div className={visual.stageTitle}><span>CAPABILITY BOUNDARY</span><h3>先把能力边界说清楚。</h3><p>产品仍处于内测共创阶段。以下内容区分当前重点、正在验证与不做预先承诺的事项。</p></div><div className={visual.stageGrid}>{capabilityStages.map(([title,copy],i)=><article key={title} data-stage={i}><b>{title}</b><p>{copy}</p></article>)}</div></div>
      <div className={visual.fitMatrix}><article><span>更适合</span><ul><li>未发布素材、客户项目或内网环境需要本地处理</li><li>有高频重复任务，希望沉淀 ComfyUI 工作流</li><li>希望自主选择模型、节点和部署方式</li><li>愿意参与测试并共同定义质量标准</li></ul></article><article><span>现阶段可能不适合</span><ul><li>只追求最新云端模型和最快单次生成</li><li>完全不希望安装、配置或维护任何环境</li><li>期待所有任务都超过云端效果与速度</li><li>要求一键产出电影级长片或原生音画成片</li></ul></article></div>
      <div className={visual.disclaimer}><ShieldCheck/><span><b>参数仅作参考，非最终版</b>产品配置、模型能力和功能范围以最终发布与实际测试结果为准；硅基词元拥有一切解释权。</span></div>
      <div className={visual.productLinks}><a className={styles.officialLink} href={OFFICIAL_URL} target="_blank" rel="noreferrer">查看产品官网 <ArrowRight/></a></div>
    </section>

    <section className={styles.team} id="team">
      <SectionHead n="05" label="CORE TEAM" title="从硬件产品，到端侧 AI 与软件生态。" copy="核心团队覆盖智能硬件、互联网商业化、高性能计算与企业软件实践。" />
      <div className={styles.teamGrid}>
        <article><div><span>创始人 & CEO</span><b>白鹏</b></div><p>20 年以上科技、互联网与智能硬件行业管理经验，覆盖 AI 硬件、软件生态与商业化全链路。曾任爱奇艺 AI 硬件公司 CEO、小米集团政企部副总裁、小米集团商业部总经理、小米集团互联网四部总经理、小米电视副总裁、迅雷总经理。</p><small>曾推动小米互联网月度收入突破 10 亿元、年度互联网收入突破 200 亿元；负责小米电视、小米盒子、小爱音箱等产品线，推动相关出货量、系统用户量与 OTT 收入达到中国第一。</small></article>
        <article><div><span>联合创始人 & CTO</span><b>沈游人</b></div><p>北京硅基词元科技有限公司联合创始人兼 CTO，北京海致科技有限公司联合创始人兼 CTO，清华大学计算机系高性能研究所成员。</p><small>长期从事高性能计算、企业软件与技术平台建设，负责 Siltok 端侧 AI 技术与产品工程方向。</small></article>
      </div>
    </section>

    <section className={styles.apply}><div><p>THREE STEPS · TWO OPTIONS</p><h2>先建立联系，<br/>再选择参与方式。</h2><span>第一步添加企微是统一入口。第二步和第三步可以任选其一，也可以同时填写：参与产品测试请提交内测申请；有商单、账号或生态资源请提交合作报价。</span><div className={visual.choiceNote}>02 / 03 按需选择 · 可同时填写</div></div><div className={styles.applyCards}><div className={styles.qrMini}><span className={visual.stepBadge}>01 · 添加企微</span><img src={asset('enterprise-wechat-shigenjie-20260904.png')} alt="石根洁的企业微信二维码"/><b>石根洁 · 硅基词元</b></div><div className={styles.qrMini}><span className={visual.stepBadge}>01 · 添加企微</span><img src={asset('enterprise-wechat-linan-20260909.png')} alt="李楠的企业微信二维码"/><b>李楠 · 硅基词元</b></div><div className={`${styles.applyCard} ${visual.betaCard}`}><span className={visual.stepBadge}>02 · 内测申请</span><FileCheck2/><h3>参与产品内测</h3><p>请创作者填写真实任务、当前工具与可参与时间。</p><a href={APPLY_URL} target="_blank" rel="noreferrer">填写内测申请 <ArrowRight/></a></div><div className={`${styles.applyCard} ${visual.commerceCard}`}><span className={visual.stepBadge}>03 · 商单生态合作</span><MessageSquareText/><h3>提交合作报价</h3><p>请创作者填写账号信息，并上传团队介绍、媒体资料包与报价文件。</p><a href={COLLAB_URL} target="_blank" rel="noreferrer">填写合作报价 <ArrowRight/></a></div></div></section>

    <footer><a href="#top" className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok"/><span>LABS</span></a><p>北京硅基词元科技有限公司 · Siltok Labs AI 创作共创社区</p><div><a href={OFFICIAL_URL} target="_blank" rel="noreferrer">产品官网</a><a href={APPLY_URL} target="_blank" rel="noreferrer">申请内测</a><a href={COLLAB_URL} target="_blank" rel="noreferrer">商单合作</a></div></footer>
  </main>;
}

function SectionHead({n,label,title,copy}) {
  return <div className={styles.sectionHead}><span>{n}</span><div><p>{label}</p><h2>{title}</h2></div><p>{copy}</p></div>;
}

function ProductOverview() {
  const [active, setActive] = useState(0);
  return <section className={styles.productOverview} id="product-overview">
    <div className={styles.overviewIntro}><p>PRODUCT FIRST · WHAT IT IS</p><h2>不是一个 AI 视频网站。<br/>是一台为本地 AI 部署设计的桌面工作站。</h2><div><p>Siltok AI Station 面向不想从零配置本地环境、又需要保留模型与工作流自主权的创作者和团队。</p><a href="#product-details">查看完整产品说明 <ArrowRight/></a></div></div>
    <div className={styles.techAdvantages}>{techAdvantages.map(([n,title,copy])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    <div className={styles.questionRouter} id="questions"><div className={styles.questionList}><p>CHOOSE YOUR QUESTION</p><h3>你可能正在问——</h3>{userQuestions.map(([question],i)=><button className={i===active?styles.activeQuestion:''} key={question} onClick={()=>setActive(i)}><span>{String(i+1).padStart(2,'0')}</span>{question}<ArrowRight/></button>)}</div><article className={styles.answerPanel}><span>ANSWER / {String(active+1).padStart(2,'0')}</span><h3>{userQuestions[active][0]}</h3><p>{userQuestions[active][1]}</p><div><a href={APPLY_URL} target="_blank" rel="noreferrer">申请内测 <ArrowRight/></a><a href="#wechat">先添加企微沟通</a></div><small>产品仍处于内测阶段；配置、模型能力和测试范围以实际确认结果为准。</small></article></div>
  </section>;
}
