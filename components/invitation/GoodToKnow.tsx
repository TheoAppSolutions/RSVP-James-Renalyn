import { EVENT } from "@/lib/event";
import { getVenueDirectionsUrl } from "@/lib/maps";

const QUESTIONS = [
  {
    question: "When and where is the wedding?",
    answer: (
      <>
        Join us on {EVENT.dateLong} at {EVENT.time} at {EVENT.venue.name}, {EVENT.venue.address}.
      </>
    ),
  },
  {
    question: "When should I reply?",
    answer: <>Please send your RSVP by {EVENT.rsvpDeadline}.</>,
  },
  {
    question: "What should I wear?",
    answer: (
      <>
        The dress code is {EVENT.dressCode.toLowerCase()}. Our garden colors are {EVENT.color.toLowerCase()}.
      </>
    ),
  },
  {
    question: "How do I get to the venue?",
    answer: (
      <>
        The venue is at {EVENT.venue.address}.{" "}
        <a href={getVenueDirectionsUrl(EVENT.venue)} target="_blank" rel="noopener noreferrer">
          Open directions ↗
        </a>
      </>
    ),
  },
];

export default function GoodToKnow() {
  return (
    <section id="faq" className="details-section section-pad" aria-labelledby="faq-title">
      <div className="section-wrap details-layout">
        <div className="details-intro">
          <span className="eyebrow">03 / Your questions</span>
          <h2 id="faq-title" className="display-heading">Good to <em>know</em></h2>
          <p>Everything you need to plan for the celebration.</p>
          <div className="reply-note">
            <strong>Kindly reply by<br />{EVENT.rsvpDeadline}</strong>
            <span>We would love to know if you can join us.</span>
            <a href="#rsvp">Confirm attendance ↗</a>
          </div>
        </div>
        <div className="details-list">
          {QUESTIONS.map(({ question, answer }, index) => (
            <details key={question}>
              <summary>
                <span>0{index + 1}</span>
                <strong>{question}</strong>
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
