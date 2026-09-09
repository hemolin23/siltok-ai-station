import { ArrowRight, Check, CircleHelp, Cpu, FileCheck2, Film, Image as ImageIcon, Layers3, LockKeyhole, MessageSquareText, MonitorUp, ShieldCheck, Workflow } from 'lucide-react';
import styles from './station.module.css';

const APPLY_URL = 'https://my.feishu.cn/share/base/shrcnVgo3Gj2zxuRtMYljrAmozd';
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
  { name: 'Siltok Base', label: '个人创作', copy: '面向独立创作者和轻量生产任务，提供开箱可用的本地模型与创作环境。', points: ['日常素材试作与版本迭代', '本地保存创作资产', '预置创作工具与基础工作流'] },
  { name: 'Siltok Pro', label: '专业工作流', copy: '面向工作室和持续生产场景，承载更复杂的模型、ComfyUI 节点与团队工作流。', points: ['复杂工作流与多轮调试', '更高频的生产任务', '按业务场景进行部署支持'] },
];

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function App() {
  return <main className={styles.page}>
    <header className={styles.nav}>
      <a href="#top" className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok" /><span>LABS</span></a>
      <nav><a href="#program">内测说明</a><a href="#tasks">测试任务</a><a href="#ecosystem">创作者生态</a><a href="#products">产品</a><a href="#team">团队</a></nav>
      <a className={styles.navCta} href={APPLY_URL} target="_blank" rel="noreferrer">申请内测 <ArrowRight /></a>
    </header>

    <section className={styles.hero} id="top">
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>SILTOK LABS · CREATOR CO-CREATION</p>
        <h1>把真实创作难题，<br/><em>变成可复用的工作流。</em></h1>
        <p className={styles.lead}>Siltok Labs 面向 AI 短剧、视觉创作、电商广告和 ComfyUI 创作者开放小规模内测。你带来真实任务与判断标准，我们提供现场或远程测试环境、使用支持和工作流共创。</p>
        <div className={styles.actions}><a className={styles.primary} href={APPLY_URL} target="_blank" rel="noreferrer">填写飞书申请表 <ArrowRight /></a><a className={styles.secondary} href={OFFICIAL_URL} target="_blank" rel="noreferrer">查看产品官网</a></div>
        <div className={styles.heroNote}><ShieldCheck /><span>申请约 3-5 分钟。提交后按真实场景与当前产品能力匹配；申请不等于自动入选。</span></div>
      </div>
      <div className={styles.heroPanel}>
        <div className={styles.panelTop}><span>CREATOR TEST / 01</span><span>现场 · 远程</span></div>
        <div className={styles.orbit}><div className={styles.device}><img src={asset('brand/siltok-blue.png')} alt=""/><span>AI STATION</span></div><i/><i/><i/></div>
        <div className={styles.panelStats}><div><b>1 周</b><span>建议测试周期</span></div><div><b>70%</b><span>真实项目</span></div><div><b>30%</b><span>定向案例</span></div></div>
      </div>
    </section>

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

    <section className={styles.products} id="products">
      <SectionHead n="04" label="SILTOK AI STATION" title="两款产品，服务不同创作负载。" copy="页面仅说明产品定位，不展开具体硬件参数。最终配置、价格和可用模型以正式发布信息为准。" />
      <div className={styles.productGrid}>{products.map((p,i)=><article key={p.name}><div className={styles.productTop}><Cpu/><span>{p.label}</span><b>0{i+1}</b></div><h3>{p.name}</h3><p>{p.copy}</p><ul>{p.points.map(x=><li key={x}><Check/>{x}</li>)}</ul></article>)}</div>
      <a className={styles.officialLink} href={OFFICIAL_URL} target="_blank" rel="noreferrer">查看产品官网 <ArrowRight/></a>
    </section>

    <section className={styles.team} id="team">
      <SectionHead n="05" label="CORE TEAM" title="从硬件产品，到端侧 AI 与软件生态。" copy="核心团队覆盖智能硬件、互联网商业化、高性能计算与企业软件实践。" />
      <div className={styles.teamGrid}>
        <article><div><span>创始人 & CEO</span><b>白鹏</b></div><p>20 年以上科技、互联网与智能硬件行业管理经验，覆盖 AI 硬件、软件生态与商业化全链路。曾任爱奇艺 AI 硬件公司 CEO、小米集团政企部副总裁、小米集团商业部总经理、小米集团互联网四部总经理、小米电视副总裁、迅雷总经理。</p><small>曾推动小米互联网月度收入突破 10 亿元、年度互联网收入突破 200 亿元；负责小米电视、小米盒子、小爱音箱等产品线，推动相关出货量、系统用户量与 OTT 收入达到中国第一。</small></article>
        <article><div><span>联合创始人 & CTO</span><b>沈游人</b></div><p>北京硅基词元科技有限公司联合创始人兼 CTO，北京海致科技有限公司联合创始人兼 CTO，清华大学计算机系高性能研究所成员。</p><small>长期从事高性能计算、企业软件与技术平台建设，负责 Siltok 端侧 AI 技术与产品工程方向。</small></article>
      </div>
    </section>

    <section className={styles.apply}><div><p>READY TO TEST A REAL TASK?</p><h2>用一个真实项目，<br/>告诉我们什么才算“可用”。</h2><span>填写创作方向、当前工具、真实场景和可参与时间。我们会先判断产品是否适合你的任务，再安排现场或远程测试。</span></div><div className={styles.applyCard}><FileCheck2/><h3>创作者内测申请</h3><p>约 3-5 分钟 · 飞书表单</p><a href={APPLY_URL} target="_blank" rel="noreferrer">立即填写 <ArrowRight/></a><small>联系方式仅用于内测沟通；公开案例与作品展示将另行征得授权。</small></div></section>

    <footer><a href="#top" className={styles.brand}><img src={asset('brand/siltok-blue.png')} alt="Siltok"/><span>LABS</span></a><p>北京硅基词元科技有限公司 · Siltok Labs AI 创作共创社区</p><div><a href={OFFICIAL_URL} target="_blank" rel="noreferrer">产品官网</a><a href={APPLY_URL} target="_blank" rel="noreferrer">申请内测</a></div></footer>
  </main>;
}

function SectionHead({n,label,title,copy}) {
  return <div className={styles.sectionHead}><span>{n}</span><div><p>{label}</p><h2>{title}</h2></div><p>{copy}</p></div>;
}
