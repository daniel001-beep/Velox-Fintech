import Navbar from "./Navbar";
import Footer from "./Footer";

export default function About() {


  return (
    <>
      <Navbar />

      <div className="small-container">
        <div
          className="row"
          style={{ display: "flex", alignItems: "center", gap: "4rem" }}
        >
          <div className="col-2" style={{ flex: 1 }}>
            <h1>Hey There, We're RedStore</h1>
            <p>
              Basically, we're just a bunch of fitness fanatics who got tired of
              overpriced workout gear. So we decided to make our own - and share
              it with everyone who loves breaking a sweat without breaking the
              bank.
            </p>
            <p style={{ marginTop: "1rem" }}>
              We're not about fancy marketing or celebrity endorsements. We're
              about real people, real workouts, and clothes that can actually
              keep up with you. Whether you're hitting the gym, going for a run,
              or just lounging in comfort, we've got you covered.
            </p>
            <a href="/products" className="btn" style={{ marginTop: "2rem" }}>
              Check Out Our Stuff <i className="fas fa-arrow-right"></i>
            </a>
          </div>
          <div className="col-2" style={{ flex: 1 }}>
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Fitness Team"
              style={{
                width: "100%",
                borderRadius: "20px",
                boxShadow: "var(--shadow-lg)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="small-container">
        <h2 className="title">What We're About</h2>
        <div className="row">
          <div className="col-3">
            <div className="value-card">
              <i className="fas fa-tshirt fa-3x"></i>
              <h3>Comfy Clothes</h3>
              <p>
                We make gear that feels as good as it looks. No scratchy fabrics
                or weird fits - just clothes you'll actually want to wear.
              </p>
            </div>
          </div>
          <div className="col-3">
            <div className="value-card">
              <i className="fas fa-wallet fa-3x"></i>
              <h3>Fair Prices</h3>
              <p>
                Quality workout gear shouldn't cost a fortune. We keep our
                prices reasonable because we believe everyone deserves good
                gear.
              </p>
            </div>
          </div>
          <div className="col-3">
            <div className="value-card">
              <i className="fas fa-users fa-3x"></i>
              <h3>Real Community</h3>
              <p>
                We're building a space where fitness lovers can connect, share
                tips, and support each other's journeys.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="small-container">
        <div
          className="row"
          style={{ display: "flex", alignItems: "center", gap: "4rem" }}
        >
          <div className="col-2" style={{ flex: 1 }}>
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Workout Gear"
              style={{
                width: "100%",
                borderRadius: "20px",
                boxShadow: "var(--shadow-lg)",
              }}
            />
          </div>
          <div className="col-2" style={{ flex: 1 }}>
            <h2>Our Gear Speaks for Itself</h2>
            <p>
              We test every product ourselves - because if we wouldn't wear it
              during our own workouts, why would we expect you to? From intense
              gym sessions to casual weekend wear, our clothes are designed to
              perform when you need them to.
            </p>
            <a href="/contact" className="btn" style={{ marginTop: "2rem" }}>
              Say Hello <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
