import { ArrowRight, Check, CircleHelp, Cpu, FileCheck2, HardDrive, LockKeyhole, MessageSquareText, Play, ShieldCheck, Workflow } from 'lucide-react';
import styles from './station.module.css';

const APPLY_URL = 'https://my.feishu.cn/share/base/shrcnVgo3Gj2zxuRtMYljrAmozd';
const COLLAB_URL = 'https://my.feishu.cn/share/base/shrcn63I30xlVeGwwS1aRNVMm7b';
const OFFICIAL_URL = 'https://siltok-ai.com/products/ai-station';
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const proofPoints = [
  ['本地模型环境', '在桌面设备中运行适配的开源模型，素材与项目文件可以留在本地。'],
  ['ComfyUI 工作流', '部署节点、模型和依赖，把成功参数与流程保存为可复用的工作流。'],
  ['软硬件一体', '设备、运行环境和技术支持统一交付，减少从零配置与维护的工作。'],
  ['云端协同', '按任务选择本地或云端工具，当前版本不承诺替代所有云端模型。'],
];

const cases = [
  { id: 'CASE 01', title: '末世重生 · 动漫短片', meta: '竖屏成片 · 43 秒', video: 'cases/anime-case.mp4', poster: 'cases/anime-poster.jpg', copy: '围绕角色、场景、动作与镜头节奏完成的动漫视频案例，用于观察本地视频工作流在连续叙事中的实际表现。', tags: ['角色与风格延续', '动作镜头', '竖屏叙事'] },
  { id: 'CASE 02', title: 'Forbidden Bride · 真人短剧', meta: '竖屏成片 · 3 分 53 秒', video: 'cases/bride-case.mp4', poster: 'cases/bride-poster.jpg', copy: '从剧本、人物关系与镜头调度出发完成的真人短剧案例，并继续围绕空间、连续性和多参考图工作流进行重制。', tags: ['真人角色', '多场景叙事', '导演重制'] },
];

const testDays = [
  ['01', '熟悉与试跑', '在技术协助下选择一个最小任务，完成首次运行。'],
  ['02', '自由测试', '在约定的3天窗口内按自己的时间测试，不要求连续在线。'],
  ['03', '反馈与复盘', '保留结果和异常，通过简短沟通确认体验与能力边界。'],
];

const boundaries = [
  ['当前可展示', '本地模型运行环境、ComfyUI 节点与工作流部署，以及本页两项实际创作案例。'],
  ['正在验证', '不同模型的生成时间、稳定性、内存占用、长时运行和复杂节点兼容情况。'],
  ['暂不承诺', '所有任务快于云端、所有模型均可运行，或一次生成达到精品成片标准。'],
];

export default function App() {
  return <main className={styles.page}>
    <header className={styles.nav}>
      <a href="#top" className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok"/><span>AI STATION</span></a>
      <nav><a href="#cases">实际案例</a><a href="#product">产品形态</a><a href="#boundary">能力边界</a><a href="#program">3天测试</a></nav>
      <a className={styles.navCta} href="#contact">联系团队 <ArrowRight/></a>
    </header>

    <section className={styles.hero} id="top">
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>LOCAL GENERATIVE AI WORKSTATION</p>
        <h1>一台为本地 AI 视频工作流设计的<br/><em>桌面创作工作站。</em></h1>
        <p className={styles.lead}>Siltok AI Station 将本地模型运行环境、ComfyUI 节点、素材与工作流放进一台设备。面向希望自主部署、处理私有素材和持续迭代内容的创作者与团队。</p>
        <div className={styles.actions}><a className={styles.primary} href="#cases">先看实际案例 <Play/></a><a className={styles.secondary} href="#product">了解产品形态</a></div>
        <div className={styles.truth}><ShieldCheck/><span>产品处于早期验证阶段。页面展示实际案例与当前边界，不以未经验证的速度或画质数据作为承诺。</span></div>
      </div>
      <div className={styles.heroMedia}>
        <video src={asset('cases/anime-case.mp4')} poster={asset('cases/anime-poster.jpg')} controls playsInline preload="metadata"/>
        <div><span>CURRENT WORK / 01</span><b>动漫视频创作案例</b><small>点击播放 · 43 秒竖屏成片</small></div>
      </div>
    </section>

    <section className={styles.definition}>
      <div className={styles.definitionLead}><span>WHAT IT IS</span><h2>它是一台主机，<br/>也是一套本地创作环境。</h2><p>连接显示器或通过远程方式操作。模型推理、节点运行、素材处理与任务记录在设备端完成。</p></div>
      <div className={styles.proofGrid}>{proofPoints.map(([title, copy], index)=><article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={styles.cases} id="cases">
      <SectionHead eyebrow="CURRENT WORK" title="先看作品，再了解设备。" copy="以下为当前创作案例的网页预览版。它们用于展示工作流能够承载的内容类型，不构成对所有模型、任务和硬件表现的统一保证。"/>
      <div className={styles.caseGrid}>{cases.map((item)=><article className={styles.caseCard} key={item.id}>
        <div className={styles.caseMedia}><video src={asset(item.video)} poster={asset(item.poster)} controls playsInline preload="none"/></div>
        <div className={styles.caseCopy}><div><span>{item.id}</span><small>{item.meta}</small></div><h3>{item.title}</h3><p>{item.copy}</p><ul>{item.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></div>
      </article>)}</div>
      <div className={styles.caseNote}><CircleHelp/><p><b>案例说明：</b>成片反映特定项目、模型与工作流条件下的结果。生成时间、参数、成功率和优化前后差异将在测试口径确认后逐步补充。</p></div>
    </section>

    <section className={styles.product} id="product">
      <div className={styles.deviceVisual}><span>SILTOK / DESKTOP AI</span><img src={asset('siltok-ai-station-perspective.png')} alt="Siltok AI Station 产品图"/></div>
      <div className={styles.productCopy}><p>PRODUCT FORM</p><h2>把模型、节点和项目，留在自己的创作桌面。</h2><p>Siltok提供桌面设备与预配置的软件环境。创作者通过Siltok Dash或ComfyUI组织模型、节点、素材和任务，技术团队协助完成适配与问题排查。</p>
        <div className={styles.productRows}><div><Cpu/><span><b>运行</b><small>适配的图像、视频与辅助模型</small></span></div><div><Workflow/><span><b>组织</b><small>ComfyUI 节点、依赖与可复用流程</small></span></div><div><HardDrive/><span><b>留存</b><small>项目素材、输出结果与工作流资产</small></span></div><div><LockKeyhole/><span><b>控制</b><small>本地数据、任务排期与模型选择</small></span></div></div>
        <a href={OFFICIAL_URL} target="_blank" rel="noreferrer">查看产品官网 <ArrowRight/></a>
      </div>
    </section>

    <section className={styles.boundary} id="boundary">
      <SectionHead eyebrow="CAPABILITY STATUS" title="现在能做什么，仍在验证什么。" copy="我们公开当前状态，让创作者先判断是否匹配，再决定是否参与。"/>
      <div className={styles.boundaryGrid}>{boundaries.map(([title, copy], index)=><article key={title} data-tone={index}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <div className={styles.fitGrid}><article><span>现阶段更适合</span><ul><li><Check/>希望尝试本地模型与ComfyUI工作流</li><li><Check/>有私有素材、本地处理或内网需求</li><li><Check/>愿意从一个非核心任务开始验证</li><li><Check/>可以接受早期产品并反馈问题</li></ul></article><article><span>现阶段建议等待</span><ul><li>只接受最新云端模型的效果与速度</li><li>项目排期紧，无法承担任何试错</li><li>要求开箱即用且全程零配置</li><li>希望直接替代成熟的精品制作流程</li></ul></article></div>
    </section>

    <section className={styles.program} id="program">
      <SectionHead eyebrow="CONTROLLED BETA" title="3天，一个最小测试任务。" copy="测试名额根据场景和设备状态匹配。测试者在约定窗口内自由安排时间，不要求连续在线或迁移完整项目。"/>
      <div className={styles.dayGrid}>{testDays.map(([n,title,copy])=><article key={n}><span>DAY {n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <div className={styles.exchange}><article><span>我们提供</span><p>现场或远程测试设备、操作引导、问题响应和必要的技术协助。</p></article><article><span>参与者提供</span><p>一个最小任务、真实结果与失败样本，以及结束后的简短反馈。</p></article></div>
    </section>

    <section className={styles.team}>
      <div><p>ABOUT SILTOK</p><h2>专注端侧 AI 技术与产品工程。</h2><span>北京硅基词元科技有限公司致力于将更强大的智能能力融入更小的设备，团队覆盖智能硬件、高性能计算、企业软件与商业化实践。</span></div>
      <div className={styles.people}><article><span>创始人 & CEO</span><h3>白鹏</h3><p>20年以上科技、互联网与智能硬件管理经验，曾负责小米电视、小米盒子、小爱音箱及互联网商业化等业务。</p></article><article><span>联合创始人 & CTO</span><h3>沈游人</h3><p>清华大学高性能技术研究所成员，长期从事高性能计算、企业软件与技术平台建设。</p></article></div>
    </section>

    <section className={styles.contact} id="contact">
      <div className={styles.contactLead}><p>JOIN THE EARLY PROGRAM</p><h2>先建立联系，<br/>再判断是否适合测试。</h2><span>添加企业微信后，可先了解产品和案例。内测申请与商单生态合作按需选择，也可以同时填写。</span></div>
      <div className={styles.contactGrid}><div className={styles.qrCard}><span>01 · 添加企业微信</span><img src={asset('enterprise-wechat-shigenjie-20260904.png')} alt="石根洁企业微信二维码"/><b>石根洁 · 硅基词元</b></div><a className={styles.formCard} href={APPLY_URL} target="_blank" rel="noreferrer"><FileCheck2/><span>02 · 产品测试</span><h3>填写内测申请</h3><p>说明创作方向、现有工具和可参与时间。</p><b>打开表单 <ArrowRight/></b></a><a className={styles.formCard} href={COLLAB_URL} target="_blank" rel="noreferrer"><MessageSquareText/><span>03 · 生态合作</span><h3>提交合作信息</h3><p>填写账号、团队能力、项目方向和合作报价。</p><b>打开表单 <ArrowRight/></b></a></div>
    </section>

    <footer><a href="#top" className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok"/><span>AI STATION</span></a><p>北京硅基词元科技有限公司</p><div><a href="#cases">实际案例</a><a href={OFFICIAL_URL} target="_blank" rel="noreferrer">产品官网</a></div></footer>
  </main>;
}

function SectionHead({eyebrow,title,copy}) { return <div className={styles.sectionHead}><p>{eyebrow}</p><h2>{title}</h2><span>{copy}</span></div>; }
