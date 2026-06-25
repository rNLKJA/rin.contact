import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  TeX,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "beyond", label: "Beyond the straight line" },
  { id: "glm", label: "The generalised linear model" },
  { id: "logistic", label: "Logistic regression" },
  { id: "poisson", label: "Poisson regression" },
  { id: "fitting", label: "Fitting and likelihood" },
  { id: "selection", label: "Model selection" },
  { id: "diagnostics", label: "Diagnostics and fit" },
  { id: "mixed", label: "When data has structure" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function StatisticalModellingKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="statistical-modelling"
      title="Statistical Modelling"
      subtitle="Linear regression is one model. This is the framework that contains it — and stretches it to counts, yes/no outcomes, and rates, all from one elegant idea."
      description="A thorough, first-principles explainer of statistical modelling — generalised linear models (GLMs), the random/systematic/link components, logistic and Poisson regression, maximum-likelihood fitting, model selection with AIC/BIC, deviance and diagnostics, and hierarchical models. Advanced tier, anchored to Rin Huang's UniMelb Master of Data Science; builds on Linear Statistical Models."
      course="Statistical Modelling"
      courseCode="Master of Data Science"
      level="Postgraduate"
      learned="UniMelb, 2023–2024"
      applied="Modelling non-normal outcomes"
      readingTime="~16 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/linear-statistical-models", label: "Linear Statistical Models" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        The <Link href="/knowledge/linear-statistical-models">linear regression
        page</Link> built one powerful model — but it assumes the outcome is a
        continuous number with normally distributed error. Real outcomes break that
        constantly: a yes/no decision, a count of events, a rate. <Term>Statistical
        modelling</Term> is the framework that keeps the interpretable, linear core of
        regression while extending it to all of those — a single, unifying idea called
        the <Term>generalised linear model</Term>.
      </p>
      <p>
        This is the statistician's answer to "model anything", and it's the deliberate
        counterpoint to the <Link href="/knowledge/statistical-machine-learning">machine
        learning</Link> view: where ML optimises for prediction, statistical modelling
        prizes <em>understanding</em> — coefficients you can interpret and inferences you
        can defend. Here's how one elegant structure covers an enormous range of data.
      </p>

      <KSection id="beyond" eyebrow="01" title="Beyond the straight line">
        <p>
          Ordinary linear regression makes two assumptions that often don't hold: that
          the outcome can be any real number, and that its error is normal with constant
          variance. Try to use it where they fail and it misbehaves — predict a
          probability and it cheerfully returns 1.4 or −0.3; model a count and it can
          predict negative events.
        </p>
        <p>
          The fix isn't a different model for every case — it's one framework that bends
          to fit. The insight of the GLM is to keep the familiar linear combination of
          predictors at the core, but connect it to the outcome through two flexible
          pieces: a choice of <em>distribution</em> for the outcome, and a{" "}
          <em>link</em> that translates between the linear predictor and that
          distribution's scale.
        </p>
      </KSection>

      <KSection id="glm" eyebrow="02" title="The generalised linear model">
        <p>
          A <Term>GLM</Term> is built from three components, and once you see them you
          can construct a model for almost any outcome:
        </p>
        <ul>
          <li>
            <Term>Random component</Term> — the probability distribution of the outcome
            (Normal for continuous, Binomial for yes/no, Poisson for counts). This is your
            choice about what kind of data you have.
          </li>
          <li>
            <Term>Systematic component</Term> — the familiar linear predictor{" "}
            <TeX>{String.raw`\eta = X\boldsymbol{\beta}`}</TeX>, a weighted sum of the
            features. Unchanged from linear regression.
          </li>
          <li>
            <Term>Link function</Term> — a function <TeX>{String.raw`g`}</TeX> connecting
            the mean of the outcome to the linear predictor.
          </li>
        </ul>
        <Formula
          label="g of the expected value of y equals eta equals X beta. The link function g maps the mean of the outcome onto the linear predictor."
          caption="The link g connects the outcome's mean to the linear predictor η = Xβ. Pick the distribution and the link, and you have a model."
        >
          {String.raw`g\big(\mathbb{E}[y]\big) = \eta = X\boldsymbol{\beta}`}
        </Formula>
        <p>
          The link is the clever part. Instead of modelling the mean directly (which might
          be bounded, like a probability in <TeX>{String.raw`[0,1]`}</TeX>), you model a{" "}
          <em>transformed</em> mean that can range freely over all real numbers — so the
          linear predictor is never forced to produce an impossible value. Choose the
          distribution and the link to match your outcome, and the same machinery fits it.
          Ordinary linear regression is just the special case: Normal distribution,
          identity link <TeX>{String.raw`g(\mu) = \mu`}</TeX>.
        </p>

        <Figure caption="The GLM's three parts. Features feed a linear predictor (η = Xβ); the link function maps it onto the mean of a chosen outcome distribution. Swapping the distribution + link gives logistic, Poisson, and ordinary regression from one structure.">
          <svg
            viewBox="0 0 440 130"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A flow: features into the linear predictor eta equals X beta, through the link function, into the outcome distribution's mean."
          >
            <rect x="10" y="48" width="92" height="36" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <text x="56" y="70" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">features X</text>
            <rect x="140" y="44" width="96" height="44" rx="2" fill="#FF3C3C" fillOpacity="0.1" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="188" y="62" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">linear pred.</text>
            <text x="188" y="76" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.8">η = Xβ</text>
            <rect x="274" y="48" width="74" height="36" rx="2" fill="#FF3C3C" fillOpacity="0.1" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="311" y="70" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">link g</text>
            <rect x="372" y="48" width="60" height="36" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <text x="402" y="66" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">E[y]</text>
            <text x="402" y="78" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">dist.</text>
            <line x1="102" y1="66" x2="138" y2="66" stroke="#FF3C3C" strokeWidth="1.3" markerEnd="url(#sm-ah)" />
            <line x1="236" y1="66" x2="272" y2="66" stroke="#FF3C3C" strokeWidth="1.3" markerEnd="url(#sm-ah)" />
            <line x1="348" y1="66" x2="370" y2="66" stroke="#FF3C3C" strokeWidth="1.3" markerEnd="url(#sm-ah)" />
            <defs>
              <marker id="sm-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="logistic" eyebrow="03" title="Logistic regression">
        <p>
          The most-used GLM models a <Term>binary outcome</Term> — yes/no, click/no-click,
          default/repay. The outcome is Binomial, and the natural link is the{" "}
          <Term>logit</Term> (the log-odds), which stretches a probability in{" "}
          <TeX>{String.raw`[0,1]`}</TeX> out onto the whole real line:
        </p>
        <Formula label="The log of p over one minus p equals X beta. The log-odds of the probability is modelled as a linear predictor.">
          {String.raw`\log\!\left(\frac{p}{1-p}\right) = X\boldsymbol{\beta}`}
        </Formula>
        <p>
          Run it backwards (the inverse link is the S-shaped <Term>logistic
          function</Term>) and any linear predictor maps to a valid probability between 0
          and 1 — no more impossible predictions. The coefficients have a clean reading
          too: each <TeX>{String.raw`\beta_j`}</TeX> is the change in <em>log-odds</em> per
          unit of <TeX>{String.raw`x_j`}</TeX>, and <TeX>{String.raw`e^{\beta_j}`}</TeX> is
          an <Term>odds ratio</Term> — "this factor multiplies the odds by 1.5". It's the
          workhorse classifier of statistics, and the bridge to the classification models
          on the <Link href="/knowledge/statistical-machine-learning">ML page</Link>.
        </p>
      </KSection>

      <KSection id="poisson" eyebrow="04" title="Poisson regression">
        <p>
          For <Term>count outcomes</Term> — number of support tickets, accidents per
          intersection, visits per patient — the outcome is Poisson and the link is the{" "}
          <Term>log</Term>:
        </p>
        <Formula label="The log of lambda equals X beta, where lambda is the expected count.">
          {String.raw`\log(\lambda) = X\boldsymbol{\beta}`}
        </Formula>
        <p>
          Modelling the log of the expected count keeps predictions positive (a count can
          never be negative) and makes the coefficients multiplicative:{" "}
          <TeX>{String.raw`e^{\beta_j}`}</TeX> is the factor by which the rate multiplies
          per unit of the predictor. Same three-part recipe, different distribution and
          link — and that's the whole point of the framework. (When counts are more
          variable than Poisson allows — <Term>overdispersion</Term> — you reach for the
          negative-binomial cousin, but the structure is identical.)
        </p>
      </KSection>

      <KSection id="fitting" eyebrow="05" title="Fitting and likelihood">
        <p>
          You can't fit a GLM with the tidy closed-form formula that ordinary least
          squares enjoys. Instead you use <Term>maximum likelihood</Term> — the same
          principle from the <Link href="/knowledge/statistics">statistics page</Link>:
          choose the coefficients that make the observed data most probable under the
          model. There's no algebraic solution, so it's found numerically by an iterative
          routine (iteratively reweighted least squares), but conceptually it's simple —
          turn the dial on <TeX>{String.raw`\boldsymbol{\beta}`}</TeX> until the data
          looks as likely as possible.
        </p>
        <p>
          The payoff of the likelihood approach is that it comes with a full inferential
          toolkit for free: standard errors, confidence intervals, and tests for each
          coefficient, exactly as on the regression page — so a fitted GLM tells you not
          just the effect sizes but how sure you can be of them.
        </p>
      </KSection>

      <KSection id="selection" eyebrow="06" title="Model selection">
        <p>
          With a framework this flexible, the danger is building a model that's too
          complex — fitting the noise, the <Link href="/knowledge/statistical-machine-learning">overfitting</Link>{" "}
          problem again. You need a principled way to compare models that rewards fit but
          penalises complexity. The standard tool is the <Term>Akaike Information
          Criterion</Term>:
        </p>
        <Formula label="A I C equals two k minus two times the log-likelihood, where k is the number of parameters.">
          {String.raw`\text{AIC} = 2k - 2\ln(\hat{L})`}
        </Formula>
        <p>
          Here <TeX>{String.raw`\ln(\hat{L})`}</TeX> measures how well the model fits (the
          maximised log-likelihood) and <TeX>{String.raw`k`}</TeX> is the number of
          parameters — so AIC trades goodness-of-fit against complexity, and{" "}
          <strong>lower is better</strong>. Adding a useless predictor improves fit a
          little but costs <TeX>{String.raw`2`}</TeX> in the penalty, so AIC only keeps it
          if it earns its place. The close relative <Term>BIC</Term> penalises parameters
          more harshly (it scales the penalty by sample size), favouring simpler models.
          Both are formal expressions of Occam's razor — the same parsimony instinct as
          regularisation, in a different guise.
        </p>
      </KSection>

      <KSection id="diagnostics" eyebrow="07" title="Diagnostics and fit">
        <p>
          A fitted GLM still needs checking. The analogue of the residual sum of squares
          is the <Term>deviance</Term> — a measure, built from the likelihood, of how far
          the model's fit falls short of a perfect one; lower deviance is better fit, and
          comparing deviances formally tests whether an added term helps. As on the
          regression page, you also inspect <Term>residuals</Term> (specially defined for
          GLMs) for leftover patterns the model missed, and watch for{" "}
          <Term>influential points</Term> distorting the fit. The discipline is the same:
          the model isn't done until you've looked at what it got wrong.
        </p>
      </KSection>

      <KSection id="mixed" eyebrow="08" title="When data has structure">
        <p>
          GLMs assume observations are independent — but often they're not. Repeated
          measurements on the same patient, students within the same school, readings from
          the same sensor: these are <em>grouped</em>, and ignoring that structure
          understates your uncertainty. <Term>Mixed-effects</Term> (or hierarchical)
          models extend the framework with <Term>random effects</Term> — group-level terms
          that let each cluster have its own adjustment while still sharing overall
          structure. It's how you honestly model nested, correlated data, and it connects
          directly to the <Link href="/knowledge/bayesian-statistics">Bayesian</Link>{" "}
          hierarchical view. The unifying message: pick the distribution, link, and
          grouping that match how the data was actually generated.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The interpretable workhorse for real outcomes">
          <p>
            Real outcomes are rarely tidy continuous numbers, and GLMs are how I model the
            ones that aren't. <strong>Logistic regression</strong> for a yes/no outcome —
            will this case escalate, did this intervention work — is a constant, precisely
            because its <strong>odds ratios</strong> are something I can put in front of a
            decision-maker and explain. <strong>Poisson</strong> models for counts and
            rates show up wherever the question is "how often". The framing that matters:
            statistical modelling optimises for <strong>interpretation and inference</strong>,
            not raw prediction — so when the goal is to <em>understand and defend</em> a
            relationship rather than just forecast it, this is the right tool, and a
            black-box <Link href="/knowledge/statistical-machine-learning">model</Link> is
            the wrong one.
          </p>
          <p>
            It also ties the statistics pages together: it generalises{" "}
            <Link href="/knowledge/linear-statistical-models">linear regression</Link>,
            runs on <Link href="/knowledge/statistics">maximum likelihood</Link>, and
            shares its parsimony logic with both regularisation and the Bayesian view.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Linear regression assumes a continuous, normal outcome. <strong>GLMs</strong>{" "}
              generalise it to counts, yes/no, and rates with one framework.
            </li>
            <li>
              Three parts: a <strong>distribution</strong> (random), the linear predictor{" "}
              <TeX>{String.raw`\eta = X\boldsymbol{\beta}`}</TeX> (systematic), and a{" "}
              <strong>link</strong> <TeX>{String.raw`g(\mathbb{E}[y]) = \eta`}</TeX>.
            </li>
            <li>
              <strong>Logistic</strong>: Binomial + logit link{" "}
              <TeX>{String.raw`\log\frac{p}{1-p}=X\boldsymbol{\beta}`}</TeX> → probabilities
              &amp; odds ratios. <strong>Poisson</strong>: log link{" "}
              <TeX>{String.raw`\log\lambda=X\boldsymbol{\beta}`}</TeX> → counts.
            </li>
            <li>
              Fit by <strong>maximum likelihood</strong> (iterative); get standard errors
              &amp; tests for free.
            </li>
            <li>
              Compare models with <strong>AIC</strong> <TeX>{String.raw`=2k-2\ln\hat{L}`}</TeX>{" "}
              / BIC (fit vs complexity, lower is better). Check <strong>deviance</strong>{" "}
              &amp; residuals.
            </li>
            <li>
              Grouped/correlated data → <strong>mixed-effects</strong> (random effects).
              Statistical modelling prizes <strong>interpretation over prediction</strong>.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
