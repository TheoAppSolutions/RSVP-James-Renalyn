import Hero from "@/components/invitation/Hero";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import Countdown from "@/components/invitation/Countdown";
import MapSection from "@/components/invitation/MapSection";
import Attire from "@/components/invitation/Attire";
import GoodToKnow from "@/components/invitation/GoodToKnow";
import Gallery from "@/components/invitation/Gallery";
import RsvpForm from "@/components/invitation/RsvpForm";
import { EVENT } from "@/lib/event";

export default function Home() {
  return (
      <main className="wedding-site">
        <Hero />
        <MusicPlayer />
        <Countdown />
        <MapSection />
        <Attire />
        <Gallery />
        <GoodToKnow />
        <section id="rsvp" className="rsvp-section" aria-labelledby="rsvp-title">
          <div className="rsvp-section-inner">
            <div className="rsvp-intro">
              <span className="eyebrow light">The celebration is better with you</span>
              <h2 id="rsvp-title" className="display-heading">The pleasure of your <em>company</em></h2>
              <p>We would be honored to celebrate this day with you. Kindly reply by {EVENT.rsvpDeadline}.</p>
              <div className="rsvp-monogram" aria-hidden="true">{EVENT.initials}</div>
            </div>
            <RsvpForm />
          </div>
        </section>
        <footer className="site-footer">
          <div className="footer-mark">{EVENT.initials}</div>
          <p>{EVENT.dateFooter} <span aria-hidden="true">·</span> {EVENT.venue.city}</p>
          <p>Made with love, for the people we love.</p>
          <a href="#top">Back to top ↑</a>
        </footer>
      </main>
  );
}
