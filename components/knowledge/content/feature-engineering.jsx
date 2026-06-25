import Link from "next/link";
import { KSection, Callout, Formula, Figure, TeX, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/feature-engineering.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (z-score) and SVG geometry are shared; prose, captions, aria-labels, and the
 * figure's box labels are localised. The ✗/✓ glyphs stay. Nine sections.
 */

const TEX = {
  z: String.raw`z = \frac{x - \mu}{\sigma}`,
  zShort: String.raw`z=(x-\mu)/\sigma`,
};

function LeakageFigure({ caption, ariaLabel, wrongFit, wrongSplit, wrongLeak, rightSplit, rightFit, rightApply }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 460 170"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <text x="14" y="30" fontSize="11" fontFamily="monospace" fill="#FF3C3C">✗</text>
        <rect x="30" y="18" width="92" height="24" rx="3" fill="none" stroke="#FF3C3C" strokeWidth="1.3" />
        <text x="76" y="34" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{wrongFit}</text>
        <line x1="122" y1="30" x2="158" y2="30" stroke="#FF3C3C" strokeWidth="1.2" markerEnd="url(#fah)" />
        <rect x="158" y="18" width="70" height="24" rx="3" fill="none" stroke="#FF3C3C" strokeWidth="1.3" />
        <text x="193" y="34" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{wrongSplit}</text>
        <text x="245" y="34" fontSize="8.5" fontFamily="monospace" fill="#FF3C3C">{wrongLeak}</text>
        <text x="14" y="108" fontSize="11" fontFamily="monospace" fill="currentColor">✓</text>
        <rect x="30" y="96" width="70" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <text x="65" y="112" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{rightSplit}</text>
        <line x1="100" y1="108" x2="132" y2="108" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#fah2)" />
        <rect x="132" y="96" width="104" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <text x="184" y="112" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{rightFit}</text>
        <line x1="236" y1="108" x2="268" y2="108" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#fah2)" />
        <rect x="268" y="96" width="120" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <text x="328" y="112" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{rightApply}</text>
        <defs>
          <marker id="fah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" /></marker>
          <marker id="fah2" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" /></marker>
        </defs>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        There's a well-worn saying in data science: you spend 80% of your time preparing the data and
        20% complaining about it. It's a joke, but the proportion is real. The model — the bit that
        gets the attention — is often a few lines and an afternoon. The <strong>data preparation</strong>{" "}
        and <strong>feature engineering</strong> — turning messy raw records into clean, informative
        inputs — is where most of the effort goes, and where most of the final accuracy is won or lost.
      </p>
      <p>
        The principle underneath is blunt: <strong>garbage in, garbage out</strong>. The most
        sophisticated model can't rescue bad inputs, and a simple model on well-engineered features
        routinely beats a fancy one on raw data. This page is the craft of that preparation, end to
        end — and the one mistake that quietly invalidates more analyses than any other.
      </p>

      <KSection id="why" eyebrow="01" title="The unglamorous 80%">
        <p>
          A <Term>feature</Term> is just an input variable the model sees. <Term>Feature engineering</Term>{" "}
          is the work of deciding what those inputs should be and getting the raw data into that shape:
          fixing what's broken, transforming what's awkward, and creating what isn't there yet. It sits
          right after the data wrangling on the{" "}
          <Link href="/knowledge/elements-of-data-processing">data-processing</Link> page and right
          before the modelling, and it's the highest-leverage stage in the whole pipeline.
        </p>
        <p>Three families of work make it up, and the rest of this page is each in turn:</p>
        <ul>
          <li>
            <strong>Clean</strong> — handle missing values, outliers, and wrong types so the data is
            trustworthy.
          </li>
          <li>
            <strong>Transform</strong> — scale, normalise, and encode so each feature is in a form the
            model can use.
          </li>
          <li>
            <strong>Create</strong> — combine and derive new features that expose the signal more
            directly.
          </li>
        </ul>
      </KSection>

      <KSection id="cleaning" eyebrow="02" title="Cleaning & missing data">
        <p>
          Real data is missing values, and <em>how</em> you handle the gaps matters more than people
          expect — because <em>why</em> a value is missing changes what's safe to do. The standard
          taxonomy:
        </p>
        <ul>
          <li>
            <Term>MCAR</Term> (missing completely at random) — the gap is unrelated to anything; the
            least harmful case.
          </li>
          <li>
            <Term>MAR</Term> (missing at random) — the missingness depends on other observed variables
            (older people skip a question); recoverable if you account for those variables.
          </li>
          <li>
            <Term>MNAR</Term> (missing not at random) — the missingness depends on the missing value
            itself (high earners don't disclose income). The dangerous case: the gap carries
            information, and naive filling biases the result.
          </li>
        </ul>
        <p>
          Options run from dropping rows (fine if few and MCAR, biased otherwise) to{" "}
          <Term>imputation</Term> — filling with the mean/median, the most frequent category, or a
          model-based guess (KNN, regression). A useful trick: add a <em>"was missing"</em> indicator
          column, so the model can learn from the fact of absence itself — which matters most precisely
          in the MNAR case.
        </p>
      </KSection>

      <KSection id="scaling" eyebrow="03" title="Scaling & transformations">
        <p>
          Features arrive on wildly different scales — age in tens, income in tens of thousands. Many
          methods are sensitive to that, so we put features on a common footing. The most common is{" "}
          <Term>standardisation</Term> (the z-score): subtract the mean, divide by the standard
          deviation, so each feature has mean 0 and standard deviation 1:
        </p>
        <Formula label="The standardised value z equals x minus the mean mu, divided by the standard deviation sigma.">
          {TEX.z}
        </Formula>
        <p>
          This matters enormously for any method that uses distances or magnitudes —{" "}
          <Link href="/knowledge/clustering">clustering</Link>,{" "}
          <Link href="/knowledge/pca-dimensionality-reduction">PCA</Link>, k-NN, gradient descent.
          Without it, the largest-scaled feature dominates by sheer numerical size, regardless of its
          actual relevance. (<Term>Min-max scaling</Term> to a fixed [0, 1] range is the common
          alternative.)
        </p>
        <p>
          Separately, skewed variables — income, populations, counts — often benefit from a{" "}
          <Term>log transform</Term> (or Box-Cox), which pulls in a long right tail toward a more
          symmetric, model-friendly shape. The goal throughout is the same: present each feature in the
          form where its signal is easiest to use.
        </p>
      </KSection>

      <KSection id="encoding" eyebrow="04" title="Encoding categories">
        <p>
          Models eat numbers, but much real data is categorical — a suburb, a status, a type. Encoding
          turns categories into numbers, and the method has to respect the data:
        </p>
        <ul>
          <li>
            <Term>One-hot encoding</Term> — one binary column per category ("NSW" → [1, 0, 0]). The
            safe default for <em>unordered</em> categories, but it explodes the column count for
            high-cardinality fields.
          </li>
          <li>
            <Term>Ordinal encoding</Term> — map ordered categories to ordered integers (low/med/high →
            0/1/2). Correct <em>only</em> when the order is real; misuse invents a ranking that isn't
            there.
          </li>
          <li>
            <Term>Target encoding</Term> — replace each category with the average target value for it.
            Powerful for high-cardinality fields (thousands of postcodes), but it peeks at the target,
            so it's a prime source of the leakage problem below if done carelessly.
          </li>
        </ul>
      </KSection>

      <KSection id="creation" eyebrow="05" title="Creating features: where domain knowledge pays">
        <p>
          The most valuable step is often <em>inventing</em> features that expose the signal more
          directly than the raw data does. This is where human understanding of the problem beats any
          algorithm:
        </p>
        <ul>
          <li>
            <strong>Date parts</strong> — a raw timestamp is nearly useless; day-of-week, month,
            is-weekend, or "days since last event" can be enormously predictive.
          </li>
          <li>
            <strong>Interactions &amp; ratios</strong> — price-per-square-metre, debt-to-income, events
            per day. A ratio can capture in one feature what two raw columns hide.
          </li>
          <li>
            <strong>Binning</strong> — grouping a continuous variable into bands when the relationship
            isn't smooth (age brackets).
          </li>
          <li>
            <strong>Domain features</strong> — anything your understanding of the field says should
            matter, made explicit so the model doesn't have to rediscover it from scratch.
          </li>
        </ul>
        <p>
          Good feature creation is the closest thing to a free lunch in modelling: it's where a person
          who understands the problem hands the model a head start.
        </p>
      </KSection>

      <KSection id="leakage" eyebrow="06" title="The cardinal sin: data leakage">
        <p>
          Here's the mistake that quietly ruins more analyses than any other, and it hides inside the
          very steps above. <Term>Data leakage</Term> is when information that wouldn't really be
          available at prediction time sneaks into the features during training. The model looks
          brilliant in testing and then fails in the real world — because it was secretly peeking at
          answers it won't have.
        </p>
        <LeakageFigure
          caption="Leakage vs the correct order. WRONG: scale/encode using the whole dataset, then split — the test set's statistics have bled into training. RIGHT: split first, fit every transform on training data only, then apply those fitted transforms to the test set."
          ariaLabel="Two pipelines. Top (wrong): transform then split, marked with a cross. Bottom (right): split then fit-on-train then apply-to-test, marked with a tick."
          wrongFit="fit on ALL"
          wrongSplit="split"
          wrongLeak="test stats leaked in"
          rightSplit="split"
          rightFit="fit on TRAIN"
          rightApply="apply to TEST"
        />
        <p>
          The classic version: you standardise or target-encode using statistics from the{" "}
          <em>whole</em> dataset, <em>then</em> split into train and test. Now the mean and standard
          deviation carry information from the test set — the model has seen a whisper of its own exam.
          The fix is an iron rule:{" "}
          <strong>split first, then fit every transform on the training data only</strong>, and apply
          those fitted transforms to the test set. (This is exactly why honest{" "}
          <Link href="/knowledge/causal-inference">evaluation</Link> and{" "}
          <Link href="/knowledge/statistics">held-out testing</Link> are so insistent about order.)
        </p>
      </KSection>

      <KSection id="selection" eyebrow="07" title="Selecting features: less can be more">
        <p>
          More features isn't always better. Irrelevant or redundant ones add noise, invite{" "}
          <Link href="/knowledge/statistical-machine-learning">overfitting</Link>, and worsen the{" "}
          <Link href="/knowledge/pca-dimensionality-reduction">curse of dimensionality</Link>.{" "}
          <Term>Feature selection</Term> trims to the inputs that earn their place, broadly three ways:
        </p>
        <ul>
          <li>
            <Term>Filter</Term> — rank features by a simple statistic (correlation with the target,
            mutual information) before modelling. Fast and model-agnostic.
          </li>
          <li>
            <Term>Wrapper</Term> — try subsets and keep what improves the model (forward/backward
            selection). Thorough but expensive.
          </li>
          <li>
            <Term>Embedded</Term> — let the model select as it trains (Lasso's L1 penalty drives weak
            coefficients to zero; tree importances). Often the sweet spot.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Where the real time goes">
          <p>
            As an analyst, this <em>is</em> most of the job. The data arrives messy — missing fields,
            inconsistent categories, timestamps that need turning into something useful — and the
            quality of the final answer is set here, long before any model runs. Knowing the{" "}
            <strong>missing-data taxonomy</strong> (is this gap MNAR and therefore informative?), when
            to <strong>standardise</strong>, and how to <strong>encode</strong> a high-cardinality field
            without leaking is the difference between a result that holds up and one that silently
            misleads.
          </p>
          <p>
            And the <strong>leakage</strong> rule is the one I'm most disciplined about, because it's
            the failure that looks like success: a model that dazzles in testing and collapses in
            production has almost always been fed information it won't have at decision time. Split
            first, fit on train only — every time. It's unglamorous, and it's where the trustworthiness
            of the whole analysis is decided.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Prep + feature engineering is <strong>most of real analysis</strong>. Garbage in, garbage
              out — a simple model on good features beats a fancy one on raw data.
            </li>
            <li>
              <strong>Missing data</strong>: know <strong>MCAR / MAR / MNAR</strong> (MNAR is dangerous
              — the gap is informative). Impute, or add a "was-missing" flag.
            </li>
            <li>
              <strong>Standardise</strong> <TeX>{TEX.zShort}</TeX> for distance/magnitude methods;{" "}
              <strong>log-transform</strong> skew. Put each feature in its most usable form.
            </li>
            <li>
              <strong>Encode</strong>: one-hot (unordered), ordinal (truly ordered only), target (high
              cardinality — leakage-prone).
            </li>
            <li>
              <strong>Create</strong> features (date parts, ratios, domain knowledge) — the closest
              thing to a free lunch.
            </li>
            <li>
              The cardinal sin is <strong>data leakage</strong>:{" "}
              <strong>split first, fit transforms on train only</strong>, apply to test. Then{" "}
              <strong>select</strong> features (filter / wrapper / embedded) — less can be more.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The missing-data taxonomy, encoding choices, and the split-before-fit leakage rule reflect
          current data-preparation references alongside coursework.
        </p>
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        数据科学里有一句老话：你花 80% 的时间准备数据，20% 的时间抱怨它。这是个玩笑，但比例是真的。
        模型——那个抢走注意力的部分——往往是几行代码和一个下午。<strong>数据准备</strong>与
        <strong>特征工程</strong>——把杂乱的原始记录变成干净、有信息量的输入——才是大部分努力的去向，
        也是最终准确度大多在此赢得或丢掉之处。
      </p>
      <p>
        底下的原则很直白：<strong>垃圾进，垃圾出</strong>。最精密的模型也救不了糟糕的输入，而一个在
        精心设计的特征上跑的简单模型，常常胜过一个在原始数据上跑的花哨模型。这一页是那门准备的手艺，
        端到端——以及那一个比任何其他都更悄悄地使更多分析失效的错误。
      </p>

      <KSection id="why" eyebrow="01" title="不光鲜的那 80%">
        <p>
          一个<Term>特征</Term>不过是模型所看到的一个输入变量。<Term>特征工程</Term>是「决定那些输入
          应当是什么、并把原始数据弄成那个形状」的工作：修好坏掉的、转换别扭的、创造尚不存在的。它
          紧接在<Link href="/knowledge/elements-of-data-processing">数据处理</Link>页上的数据整理之后、
          紧接在建模之前，是整条流水线中杠杆最高的阶段。
        </p>
        <p>它由三类工作构成，本页的其余部分依次讲每一类：</p>
        <ul>
          <li><strong>清洗</strong>——处理缺失值、离群点与错误类型，好让数据可信。</li>
          <li><strong>转换</strong>——缩放、归一化、编码，好让每个特征都处于模型能用的形式。</li>
          <li><strong>创造</strong>——组合并派生出更直接地暴露信号的新特征。</li>
        </ul>
      </KSection>

      <KSection id="cleaning" eyebrow="02" title="清洗与缺失数据">
        <p>
          真实数据缺着值，而<em>你如何</em>处理这些缺口，比人们预期的更要紧——因为一个值<em>为什么
          </em>缺失，改变了什么做法才安全。标准的分类法：
        </p>
        <ul>
          <li>
            <Term>MCAR</Term>（完全随机缺失）——缺口与任何东西都无关；最无害的情形。
          </li>
          <li>
            <Term>MAR</Term>（随机缺失）——缺失依赖于其他被观测的变量（年长的人跳过某个问题）；只要
            你把那些变量纳入考虑就可恢复。
          </li>
          <li>
            <Term>MNAR</Term>（非随机缺失）——缺失依赖于缺失的值本身（高收入者不披露收入）。危险的
            情形：缺口本身携带信息，而天真地填补会让结果有偏。
          </li>
        </ul>
        <p>
          选项从丢掉行（若数量少且为 MCAR 则没问题，否则有偏）一直到<Term>插补</Term>——用均值/中位数、
          最频繁的类别，或一个基于模型的猜测（KNN、回归）来填。一个有用的技巧：添加一个<em>「曾缺失」
          </em>指示列，好让模型能从「缺失」这一事实本身学习——而这恰恰在 MNAR 的情形里最要紧。
        </p>
      </KSection>

      <KSection id="scaling" eyebrow="03" title="缩放与变换">
        <p>
          特征到来时尺度天差地别——年龄以十计，收入以万计。许多方法对此敏感，所以我们把特征放到一个
          共同的基准上。最常见的是<Term>标准化</Term>（z 分数）：减去均值，除以标准差，好让每个特征
          均值为 0、标准差为 1：
        </p>
        <Formula label="标准化后的值 z 等于 x 减去均值 mu，再除以标准差 sigma。">
          {TEX.z}
        </Formula>
        <p>
          这对任何使用距离或大小的方法——<Link href="/knowledge/clustering">聚类</Link>、
          <Link href="/knowledge/pca-dimensionality-reduction">PCA</Link>、k-NN、梯度下降——都极其要紧。
          没有它，尺度最大的特征会仅凭数值上的大小而主导，不管它实际相关性如何。（缩放到固定的
          [0, 1] 范围的<Term>最小-最大缩放</Term>是常见的替代。）
        </p>
        <p>
          另外，偏斜的变量——收入、人口、计数——往往受益于一次<Term>对数变换</Term>（或 Box-Cox），它
          把一条长长的右尾拉向一个更对称、更模型友好的形状。贯穿始终的目标都一样：以「其信号最易被
          使用」的形式呈现每个特征。
        </p>
      </KSection>

      <KSection id="encoding" eyebrow="04" title="类别编码">
        <p>
          模型吃的是数字，但许多真实数据是类别的——一个街区、一个状态、一个类型。编码把类别变成数字，
          而方法必须尊重数据：
        </p>
        <ul>
          <li>
            <Term>独热编码</Term>——每个类别一个二元列（「NSW」→ [1, 0, 0]）。<em>无序</em>类别的安全
            默认，但对高基数字段它会让列数爆炸。
          </li>
          <li>
            <Term>序数编码</Term>——把有序的类别映射到有序的整数（低/中/高 → 0/1/2）。<em>只有</em>当
            顺序是真实的时才正确；误用会发明一个本不存在的排名。
          </li>
          <li>
            <Term>目标编码</Term>——用每个类别的平均目标值来替换它。对高基数字段（成千上万个邮编）很
            强大，但它偷看了目标，所以如果做得草率，它是下面那个泄漏问题的主要来源。
          </li>
        </ul>
      </KSection>

      <KSection id="creation" eyebrow="05" title="创造特征：领域知识获得回报之处">
        <p>
          最有价值的一步，往往是<em>发明</em>那些比原始数据更直接地暴露信号的特征。这正是人对问题的
          理解胜过任何算法之处：
        </p>
        <ul>
          <li>
            <strong>日期成分</strong>——一个原始时间戳几乎无用；星期几、月份、是否周末，或「距上次
            事件的天数」可以极具预测力。
          </li>
          <li>
            <strong>交互项与比率</strong>——每平方米价格、负债收入比、每天的事件数。一个比率能用一个
            特征捕捉两个原始列藏起来的东西。
          </li>
          <li>
            <strong>分箱</strong>——当关系不平滑时，把一个连续变量分成若干段（年龄段）。
          </li>
          <li>
            <strong>领域特征</strong>——任何你对该领域的理解认为应当要紧的东西，明确地做出来，好让
            模型不必从零重新发现它。
          </li>
        </ul>
        <p>
          好的特征创造，是建模中最接近免费午餐的东西：它是一个理解问题的人递给模型一个先发优势之处。
        </p>
      </KSection>

      <KSection id="leakage" eyebrow="06" title="大罪：数据泄漏">
        <p>
          这就是那个比任何其他都更悄悄地毁掉更多分析的错误，而它就藏在上面那些步骤之中。
          <Term>数据泄漏</Term>是指：在预测时本不会真正可得的信息，在训练期间偷偷溜进了特征里。模型
          在测试中看起来出色，随后在真实世界里失败——因为它一直在偷看它不会拥有的答案。
        </p>
        <LeakageFigure
          caption="泄漏 vs 正确的顺序。错误：用整个数据集缩放/编码，再拆分——测试集的统计已经渗入了训练。正确：先拆分，仅在训练数据上拟合每一个变换，再把那些拟合好的变换应用到测试集上。"
          ariaLabel="两条流水线。上（错误）：先变换再拆分，标着一个叉。下（正确）：先拆分再在训练上拟合再应用到测试，标着一个对勾。"
          wrongFit="在全部上拟合"
          wrongSplit="拆分"
          wrongLeak="测试统计被泄入"
          rightSplit="拆分"
          rightFit="在训练上拟合"
          rightApply="应用到测试"
        />
        <p>
          经典的版本：你用<em>整个</em>数据集的统计来做标准化或目标编码，<em>然后</em>才拆分成训练与
          测试。现在均值与标准差携带了来自测试集的信息——模型已经听见了自己考试的一丝低语。修法是一条
          铁律：<strong>先拆分，再仅在训练数据上拟合每一个变换</strong>，并把那些拟合好的变换应用到
          测试集上。（这正是为什么诚实的<Link href="/knowledge/causal-inference">评估</Link>与
          <Link href="/knowledge/statistics">留出测试</Link>对顺序如此较真。）
        </p>
      </KSection>

      <KSection id="selection" eyebrow="07" title="选择特征：少即是多">
        <p>
          特征更多并不总是更好。无关的或冗余的特征添加噪声、招致
          <Link href="/knowledge/statistical-machine-learning">过拟合</Link>，并加剧
          <Link href="/knowledge/pca-dimensionality-reduction">维度灾难</Link>。<Term>特征选择</Term>把
          输入修剪到那些配得上自己位置的，大体有三种方式：
        </p>
        <ul>
          <li>
            <Term>过滤式</Term>——在建模之前，按一个简单的统计量（与目标的相关、互信息）给特征排名。
            快且与模型无关。
          </li>
          <li>
            <Term>包裹式</Term>——尝试子集，保留能改善模型的（前向/后向选择）。彻底但昂贵。
          </li>
          <li>
            <Term>嵌入式</Term>——让模型在训练时自行选择（Lasso 的 L1 惩罚把弱系数压到零；树的
            重要性）。往往是最佳折中点。
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="真正的时间都去哪了">
          <p>
            作为一名分析师，这<em>就是</em>工作的大头。数据到来时是杂乱的——缺失的字段、不一致的类别、
            需要被变成有用之物的时间戳——而最终答案的质量在这里就已定下，远在任何模型运行之前。懂得
            <strong>缺失数据的分类法</strong>（这个缺口是 MNAR、因而有信息量吗？）、何时该
            <strong>标准化</strong>，以及如何在不泄漏的情况下<strong>编码</strong>一个高基数字段，正是
            「一个站得住脚的结果」与「一个悄悄误导的结果」之间的区别。
          </p>
          <p>
            而<strong>泄漏</strong>规则是我最严守的那一条，因为它是那种看起来像成功的失败：一个在
            测试中惊艳、却在生产中崩溃的模型，几乎总是被喂了它在决策时不会拥有的信息。先拆分，仅在
            训练上拟合——每一次。它不光鲜，却是整个分析的可信度被决定之处。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              准备 + 特征工程是<strong>真实分析的大头</strong>。垃圾进，垃圾出——一个在好特征上的简单
              模型胜过一个在原始数据上的花哨模型。
            </li>
            <li>
              <strong>缺失数据</strong>：搞清 <strong>MCAR / MAR / MNAR</strong>（MNAR 危险——缺口有
              信息量）。插补，或添加一个「曾缺失」标志。
            </li>
            <li>
              为距离/大小类方法<strong>标准化</strong> <TeX>{TEX.zShort}</TeX>；对偏斜做<strong>对数
              变换</strong>。把每个特征放到它最可用的形式。
            </li>
            <li>
              <strong>编码</strong>：独热（无序）、序数（仅真正有序）、目标（高基数——易泄漏）。
            </li>
            <li>
              <strong>创造</strong>特征（日期成分、比率、领域知识）——最接近免费午餐的东西。
            </li>
            <li>
              大罪是<strong>数据泄漏</strong>：<strong>先拆分，仅在训练上拟合变换</strong>，再应用到
              测试。然后<strong>选择</strong>特征（过滤 / 包裹 / 嵌入）——少即是多。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          缺失数据的分类法、编码的选择，以及「先拆分再拟合」的泄漏规则，反映了当前的数据准备参考
          文献，以及课程学习。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Feature Engineering & Data Preparation",
    subtitle:
      "The glamorous part of analysis is the model. The part that actually decides whether it works is everything before it — cleaning, transforming, and shaping the data into features. It's most of the job, and the part most worth doing well.",
    description:
      "A thorough, practical explainer of feature engineering and data preparation — why prep dominates real analysis, cleaning and missing-data strategies (MCAR/MAR/MNAR, imputation), scaling and transformations, encoding categoricals (one-hot, ordinal, target encoding), creating features, the cardinal sin of data leakage, and feature selection. Foundation tier, anchored to Rin Huang's analyst work.",
    course: "Feature Engineering & Data Preparation",
    courseCode: "Foundation · the real 80%",
    level: "Foundation",
    learned: "Data science · UniMelb",
    applied: "Most of every project",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "The unglamorous 80%" },
      { id: "cleaning", label: "Cleaning & missing data" },
      { id: "scaling", label: "Scaling & transforms" },
      { id: "encoding", label: "Encoding categories" },
      { id: "creation", label: "Creating features" },
      { id: "leakage", label: "The cardinal sin: leakage" },
      { id: "selection", label: "Selecting features" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/elements-of-data-processing", label: "Elements of Data Processing" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "特征工程与数据准备",
    subtitle:
      "分析中光鲜的部分是模型。真正决定它行不行的部分，是它之前的一切——清洗、转换，并把数据塑造成特征。这是工作的大头，也是最值得做好的部分。",
    description:
      "对特征工程与数据准备的详尽、实用讲解——为什么准备主导了真实的分析、清洗与缺失数据策略（MCAR/MAR/MNAR、插补）、缩放与变换、类别编码（独热、序数、目标编码）、创造特征、数据泄漏这一大罪，以及特征选择。基础层，锚定 Rin Huang 的分析师工作。",
    course: "特征工程与数据准备",
    courseCode: "基础 · 真正的那 80%",
    level: "基础",
    learned: "数据科学 · 墨尔本大学",
    applied: "每个项目的大头",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "不光鲜的那 80%" },
      { id: "cleaning", label: "清洗与缺失数据" },
      { id: "scaling", label: "缩放与变换" },
      { id: "encoding", label: "类别编码" },
      { id: "creation", label: "创造特征" },
      { id: "leakage", label: "大罪：泄漏" },
      { id: "selection", label: "选择特征" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/elements-of-data-processing", label: "数据处理要素" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "feature-engineering", updated: "2026-06-26", ...meta, Body };
}
