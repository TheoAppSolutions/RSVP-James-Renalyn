import Link from "next/link";

export default function RsvpDashboardLink() {
  return (
    <div className="rsvp-dashboard">
      <span className="eyebrow">Guest responses</span>
      <h3>Thank you for your wishes</h3>
      <p>View the guest list and the heartfelt messages shared for our special day.</p>
      <Link href="/admin/" className="dashboard-button">
        View admin dashboard <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
