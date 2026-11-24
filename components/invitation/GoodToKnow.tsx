import { EVENT } from "@/lib/event";

const NOTES = [
  {
    category: "Guest list",
    question: "May I bring a plus-one?",
    answer: "We have intentionally kept our guest list intimate so that we can celebrate with the people closest to us. Please join us only with the guest named on your invitation.",
  },
  {
    category: "Gift guide",
    question: "Your presence is enough",
    answer: "Having you with us is the greatest gift. If you would like to bless us as we begin married life, a monetary gift would be warmly appreciated—but please know that your presence means the most.",
  },
  {
    category: "Privacy notice",
    question: "Be fully present with us",
    answer: "Our ceremony will be unplugged. Kindly keep phones and cameras tucked away during the ceremony, and please wait for us to share first before posting wedding photos online.",
  },
  {
    category: "Time observance",
    question: "We will begin on time",
    answer: "We are grateful to everyone traveling to celebrate with us. Please arrive early enough to be seated before the ceremony begins, so we can honor the day’s timeline together.",
  },
  {
    category: "Occasion focus",
    question: "Today is about the couple",
    answer: "Please save proposals, pregnancy announcements, and other major announcements for another occasion. Today is dedicated to celebrating James and Renalyn.",
  },
];

export default function GoodToKnow() {
  return (
    <section id="good-to-know" className="details-section section-pad" aria-labelledby="good-to-know-title">
      <div className="section-wrap details-layout">
        <div className="details-intro">
          <span className="eyebrow">03 / Good to know</span>
          <h2 id="good-to-know-title" className="display-heading">Good to <em>know</em></h2>
          <p>Everything you need to plan for the celebration.</p>
          <div className="reply-note">
            <strong>Kindly reply by<br />{EVENT.rsvpDeadline}</strong>
            <span>We would love to know if you can join us.</span>
            <a href="#rsvp">Confirm attendance ↗</a>
          </div>
        </div>
        <div className="details-list">
          {NOTES.map(({ category, question, answer }, index) => (
            <details key={question}>
              <summary>
                <span>0{index + 1}</span>
                <div>
                  <small>{category}</small>
                  <strong>{question}</strong>
                </div>
                <i aria-hidden="true">+</i>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
