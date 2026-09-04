import {
  ArrowDown, ArrowRight, AudioLines, Check, ChevronRight, Film, Gauge,
  HardDrive, Image as ImageIcon, Layers3, LockKeyhole, RefreshCw,
  ShieldCheck, Sparkles, Workflow, X, Boxes, BadgeCheck, GitBranch,
  Store, Users, Wrench,
} from 'lucide-react';
import styles from './station.module.css';

const engineData = [
  { index: '01', name: 'LTX 2.3 / 2.5', role: '快速创作', icon: Gauge, copy: '适合预览、图生视频、首尾帧与音图生视频。需要更快看到方向时，从这里开始。', metrics: ['720P · 15秒 ≈ 1.5分钟', '1080P · 15秒 ≈ 5.5分钟'], tags: ['文生视频', '图生视频', '首尾帧', '声音与口型'] },
  { index: '02', name: 'MiniMax H3 · BF16', role: '高控制生成', icon: Layers3, copy: '满血模型本地运行。用人物、场景、动作、视频和声音作为参考，完成更复杂的镜头描述。', metrics: ['生成模式 · 15秒 ≈ 6分钟', '多参考模式 · 15秒 ≈ 8分钟'], tags: ['BF16 非量化', '多参考', '原生音频', '结构化分镜'] },
  { index: '03', name: 'SCAIL-2', role: '角色与动作', icon: RefreshCw, copy: '让角色跟随参考动作，或把参考视频中的人物替换为设定角色，适合动作预演与快速实验。', metrics: ['896×520 · 5秒 ≈ 2分钟', '当前定位：实验型能力'], tags: ['角色动画', '动作迁移', '角色替换'] },
];

const flow = [
  { n: '01', label: '想法与剧本', detail: '输入故事、分镜或一句创意', icon: Sparkles },
  { n: '02', label: '人物与素材', detail: '加入图片、视频和声音参考', icon: ImageIcon },
  { n: '03', label: '选择工作流', detail: '系统匹配模型与生成方式', icon: Workflow },
  { n: '04', label: '本地生成', detail: '素材、模型与过程留在设备', icon: HardDrive },
  { n: '05', label: '调整与导出', detail: '超分、重绘并沉淀可复用模板', icon: Film },
];

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function App() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <a href="#top" className={styles.logoLink} aria-label="Siltok AI Station 首页">
          <img src={asset('brand/siltok-blue.png')} alt="Siltok" />
          <span>AI STATION</span>
        </a>
        <nav aria-label="页面导航">
          <a href="#workflow">创作方式</a>
          <a href="#engines">模型能力</a>
          <a href="#comfyui">ComfyUI生态</a>
          <a href="#compare">本地与云端</a>
          <a href="#limits">能力边界</a>
        </nav>
        <a href="#contact" className={styles.navCta}>认识一下 <ArrowRight size={15} /></a>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span>CREATOR CO-CREATION / 10.30 阶段目标</span></p>
          <h1>想和认真创作的人，<br /><em>一起做点真的。</em></h1>
          <p className={styles.lead}>我们正在把满血模型、ComfyUI 节点和真实工作流带到本地设备。产品还没有完全准备好，所以现在不是一次销售，而是一份诚实的共创邀请。</p>
          <div className={styles.actions}>
            <a href="#contact" className={styles.primary}>先聊聊你的创作 <ArrowRight /></a>
            <a href="#limits" className={styles.secondary}>看我们说清边界 <ArrowDown /></a>
          </div>
          <p className={styles.disclaimer}>当前为研发共创阶段；页面能力为内部进展与 10 月 30 日阶段目标，不代表正式交付承诺。</p>
        </div>

        <div className={styles.stationStage} aria-label="Siltok 本地创作工作站能力示意">
          <div className={styles.stageMeta}><span>STATION / 01</span><span>LOCAL · PRIVATE · REPEATABLE</span></div>
          <div className={styles.machine}>
            <div className={styles.machineFace}><img src={asset('brand/siltok-blue.png')} alt="" /></div>
            <div className={styles.machineVent} />
            <div className={styles.machineLight} />
          </div>
          <div className={styles.flowRail}>
            <span className={styles.flowLabel}>BF16 非量化模型</span>
            <i /><i /><i /><i /><i />
            <strong>研发验证中</strong>
          </div>
          <div className={styles.stageStats}>
            <div><Film /><span>产品阶段</span><strong>研发共创中</strong></div>
            <div><ShieldCheck /><span>阶段目标</span><strong>10 / 30</strong></div>
            <div><HardDrive /><span>合作起点</span><strong>先聊真实任务</strong></div>
          </div>
        </div>
      </section>

      <section className={styles.proofBar} id="evidence">
        <span>研发进展与共创原则</span>
        <div><strong>核心技术已跑通</strong><small>H3 BF16 · 非量化</small></div>
        <div><strong>产品仍在打磨</strong><small>不把用户当免费测试员</small></div>
        <div><strong>10 月 30 日</strong><small>阶段能力目标</small></div>
        <div><strong>结论不预设</strong><small>欢迎真实甚至负面反馈</small></div>
      </section>

      <section className={styles.workflowSection} id="workflow">
        <div className={styles.sectionHead}>
          <span className={styles.sectionNo}>01</span>
          <div><p>FROM IDEA TO FRAME</p><h2>从一个想法，到一段可用镜头。</h2></div>
          <p className={styles.sectionIntro}>你不需要先理解模型、节点和参数。把任务交给工作流，让每一次生成都能够被复用。</p>
        </div>
        <div className={styles.flowLine}>
          {flow.map(({ n, label, detail, icon: Icon }) => <article key={n}>
            <div className={styles.flowTop}><span>{n}</span><Icon /></div>
            <h3>{label}</h3><p>{detail}</p><i />
          </article>)}
        </div>
      </section>

      <section className={styles.enginesSection} id="engines">
        <div className={styles.sectionHead}>
          <span className={styles.sectionNo}>02</span>
          <div><p>THREE CREATION ENGINES</p><h2>不是模型列表，是三种创作节奏。</h2></div>
          <p className={styles.sectionIntro}>追求效率、控制或角色动作，选择不同的工作方式。所有时间均为当前测试环境参考值。</p>
        </div>
        <div className={styles.engineStack}>
          {engineData.map(({ index, name, role, icon: Icon, copy, metrics, tags }) => <article key={name}>
            <div className={styles.engineIndex}>{index}</div>
            <div className={styles.engineTitle}><Icon /><span>{role}</span><h3>{name}</h3></div>
            <p className={styles.engineCopy}>{copy}</p>
            <div className={styles.metrics}>{metrics.map(m => <span key={m}>{m}</span>)}</div>
            <div className={styles.tags}>{tags.map(t => <span key={t}>{t}</span>)}</div>
          </article>)}
        </div>
      </section>

      <section className={styles.scenarioSection}>
        <div className={styles.scenarioCopy}>
          <span className={styles.sectionNo}>03</span>
          <p className={styles.monoKicker}>ONE WORKFLOW, BUILT FOR YOUR TASK</p>
          <h2>不急着让你测试。<br />先做彼此信任的朋友。</h2>
          <p>先用 15 分钟理解你长期头疼的环节。只有产品当前能力真的可能帮到你，我们才邀请你继续共创；不合适，也会坦诚说明。</p>
          <a href="#contact">先认识一下 <ArrowRight /></a>
        </div>
        <div className={styles.timelineBoard} aria-label="专属工作流示意">
          <div className={styles.boardHeader}><span>WORKFLOW / SHORT DRAMA 01</span><span>00:00:15:00</span></div>
          <div className={styles.track}><span><ImageIcon /> 人物设定</span><i className={styles.clipLong}>角色参考 · 5张</i></div>
          <div className={styles.track}><span><Film /> 视频生成</span><i>镜头 01</i><i>镜头 02</i><i>镜头 03</i></div>
          <div className={styles.track}><span><AudioLines /> 声音与口型</span><i className={styles.clipMid}>对白音频 · LipDub</i></div>
          <div className={styles.playhead}><b>08s</b></div>
          <div className={styles.boardFoot}><span><LockKeyhole /> 素材保存在本地</span><span>模板已保存 ✓</span></div>
        </div>
      </section>

      <section className={styles.comfySection} id="comfyui">
        <div className={styles.sectionHead}>
          <span className={styles.sectionNo}>04</span>
          <div><p>COMFYUI · VERIFIED WORKFLOWS</p><h2>工作流不只“能导入”，还要知道它验证到了哪一步。</h2></div>
          <p className={styles.sectionIntro}>Siltok为工作流、运行环境、节点和模型建立版本与证据记录。发生变化后，旧结论会停止沿用。</p>
        </div>
        <div className={styles.certaintyMap}>
          <div className={styles.certaintyRail}>
            {[
              ['01','来源固定','记录发布者、版本与许可'],
              ['02','结构可解释','识别输入、节点与模型依赖'],
              ['03','运行有证据','区分静态检查与真实生成'],
              ['04','产品入口批准','明确可在哪个入口使用'],
            ].map(([n,t,d])=><div key={n}><span>{n}</span><strong>{t}</strong><small>{d}</small></div>)}
          </div>
          <div className={styles.determinationCard}>
            <div className={styles.detHeader}><span>WORKFLOW DETERMINATION</span><BadgeCheck /></div>
            <h3>每个结论都绑定版本与证据</h3>
            <p>即使结果是暂不可用，也能定位阻塞发生在工作流、节点、模型、运行环境还是产品入口。</p>
            <div className={styles.detStatus}><span><i className={styles.statusResearch}/> 已收录研究</span><span><i className={styles.statusVerified}/> 已验证运行</span><span><i className={styles.statusProduct}/> 已批准使用</span></div>
            <div className={styles.currentBoundary}><GitBranch/><div><strong>当前公开边界</strong><span>首批工作流仍在研究目录验证中；进入Dash或普通ComfyUI执行前需完成独立批准。</span></div></div>
          </div>
        </div>
      </section>

      <section className={styles.partnerSection} id="partners">
        <div className={styles.partnerHead}><span>CREATOR PARTNER NETWORK</span><h2>懂工作流的人，<br/>不只是用户。</h2><p>ComfyUI教程作者、节点开发者和开源模型创作者，可以参与工作流验证、方案交付与用户服务，共同把成熟能力带给更多创作者。</p></div>
        <div className={styles.partnerRoles}>
          <article><Boxes/><span>01</span><h3>工作流贡献者</h3><p>提交原创或获授权的工作流，参与版本登记、适配和测试。</p><small>回报方向：署名、展示、共创权益</small></article>
          <article><Wrench/><span>02</span><h3>认证方案伙伴</h3><p>为垂直行业用户完成部署、培训、工作流配置和问题支持。</p><small>回报方向：项目合作、服务收益</small></article>
          <article><Store/><span>03</span><h3>未来生态伙伴</h3><p>产品与案例真正成立后，再共同探索方案交付与渠道合作。</p><small>当前不承诺经销资格或收益</small></article>
        </div>
        <div className={styles.partnerRule}><Users/><p><strong>先认识、再共创、后合作。</strong>我们重视工作流原创性、真实案例、服务能力，也重视对产品边界的诚实表达。</p><a href="#contact">先聊聊彼此 <ArrowRight/></a></div>
      </section>

      <section className={styles.compareSection} id="compare">
        <div className={styles.sectionHead}>
          <span className={styles.sectionNo}>06</span>
          <div><p>LOCAL OR CLOUD?</p><h2>不是替代云端，而是重新分配任务。</h2></div>
          <p className={styles.sectionIntro}>云端适合即时、偶发的生成；本地更适合持续、敏感和需要沉淀的流程。</p>
        </div>
        <div className={styles.compareTable}>
          <div className={styles.tableHead}><span>你的创作情况</span><strong>云端工具</strong><strong>Siltok 本地工作站</strong></div>
          {[
            ['偶尔生成，马上要结果', '更适合', '不一定需要'],
            ['反复抽卡与持续批量生产', '费用随次数增长', '边际生成成本更可控'],
            ['未发布IP与敏感商业素材', '需要上传平台', '本地保存与处理'],
            ['固定人物、参数与团队流程', '每次重新配置', '沉淀为专属工作流'],
            ['不懂部署和节点维护', '直接使用', '由 Siltok 协助配置'],
          ].map((row, i) => <div className={styles.tableRow} key={row[0]}><span>{row[0]}</span><span className={i === 0 ? styles.good : ''}>{row[1]}</span><span className={i > 0 ? styles.good : ''}>{row[2]}</span></div>)}
        </div>
      </section>

      <section className={styles.techSection}>
        <div className={styles.techVisual} aria-hidden="true">
          <div className={styles.weightBlock}><span>FULL MODEL</span><strong>120GB</strong></div>
          <div className={styles.conveyor}>{[1,2,3,4,5,6].map(n=><i key={n}/>)}</div>
          <div className={styles.gpuBlock}><span>CONSUMER GPU</span><strong>16GB</strong><small>分层调度 · 提前搬运</small></div>
        </div>
        <div className={styles.techCopy}><p className={styles.monoKicker}>SILTOK INFERENCE SYSTEM</p><h2>技术跑通，<br />只是共创的起点。</h2><p>这里的“完整”指使用 BF16 非量化权重，不代表高于模型官方分辨率。H3 当前按官方规格最高 1344×768；LTX 当前最高 1920×1080。</p><ul><li><Check /> MiniMax H3 BF16 非量化权重</li><li><Check /> 自研推理调度与 CUDA 算子</li><li><Check /> 产品体验仍在联合验证</li></ul></div>
      </section>

      <section className={styles.limitsSection} id="limits">
        <div className={styles.sectionHead}>
          <span className={styles.sectionNo}>07</span>
          <div><p>WHAT IT IS — AND ISN'T</p><h2>真实边界，比一句“更快”更重要。</h2></div>
        </div>
        <div className={styles.limitGrid}>
          <div className={styles.does}><h3><Check /> 已确认的研发进展</h3><ul><li>核心技术已跑通 MiniMax H3 BF16 非量化模型</li><li>H3 官方规格最高 1344×768</li><li>LTX 内部测试支持 720P / 1080P</li><li>ComfyUI 工作流已建立版本与证据规范</li><li>更多产品入口与工作流仍在验证</li></ul></div>
          <div className={styles.notYet}><h3><X /> 当前不做的承诺</h3><ul><li>不承诺所有任务都比云端更快或质量更高</li><li>不承诺一次生成即可直接商用</li><li>不把内部测试数据包装成正式交付能力</li><li>不承诺未经验证的工作流已经可用</li><li>价格、配置和模型清单以最终产品为准</li></ul></div>
        </div>
      </section>

      <section className={styles.contactSection} id="contact">
        <div className={styles.contactCopy}><span>LET'S BECOME CREATOR FRIENDS</span><h2>先认识，先交流。<br />不急着让你测试。</h2><p>我们不会让你替未成熟的产品排基础问题。先用 15 分钟了解一次真实创作流程；如果当前能力不适合，我们也会直接说明。</p><div className={styles.contactSteps}><span><b>01</b> 企业微信认识</span><ChevronRight/><span><b>02</b> 分享真实难题</span><ChevronRight/><span><b>03</b> 再决定是否共创</span></div></div>
        <div className={styles.qrCard}><img src={asset('enterprise-wechat-shigenjie-20260904.png')} alt="石根洁的企业微信二维码"/><strong>添加我的企业微信</strong><span>石根洁 · 硅基词元</span></div>
      </section>

      <footer className={styles.footer}><a href="#top" className={styles.logoLink}><img src={asset('brand/siltok-blue.png')} alt="Siltok"/><span>AI STATION</span></a><p>价格和参数仅作参考，非最终版，硅基词元拥有一切解释权</p><a href="#top">回到顶部 ↑</a></footer>
    </main>
  );
}
