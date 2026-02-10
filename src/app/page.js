export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-5 mb-5">
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="display-3 fw-bold mb-4">
                  Learn Skills That Matter
                </h1>
                <p className="lead mb-4">
                  Join thousands of learners and gain practical skills through
                  structured online courses. Transform your career with expert-led
                  training and hands-on projects.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <a
                    href="/courses"
                    className="btn btn-light btn-lg px-4 py-3"
                  >
                    <i className="bi bi-book me-2"></i>
                    Browse Courses
                  </a>
                  <a
                    href="/sign-up"
                    className="btn btn-outline-light btn-lg px-4 py-3"
                  >
                    <i className="bi bi-person-plus me-2"></i>
                    Get Started Free
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image text-center">
                <div className="bg-white bg-opacity-10 rounded-4 p-4 backdrop-blur-sm">
                  <i className="bi bi-mortarboard display-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 mb-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why Choose LearnHub?</h2>
            <p className="lead text-muted">
              Discover the features that make our platform exceptional
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body text-center">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-play-circle display-4 text-primary"></i>
                  </div>
                  <h4 className="card-title">Expert Instructors</h4>
                  <p className="card-text text-muted">
                    Learn from industry experts with real-world experience and
                    proven teaching methods.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body text-center">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-clock-history display-4 text-primary"></i>
                  </div>
                  <h4 className="card-title">Learn at Your Pace</h4>
                  <p className="card-text text-muted">
                    Access courses anytime, anywhere. Study at your own pace with
                    lifetime access to content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body text-center">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-award display-4 text-primary"></i>
                  </div>
                  <h4 className="card-title">Certified Courses</h4>
                  <p className="card-text text-muted">
                    Earn recognized certificates upon completion to boost your
                    career prospects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="py-5 mb-5 bg-dark bg-opacity-50">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Popular Courses</h2>
            <p className="lead text-muted">
              Explore our most sought-after courses
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card course-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-code-slash display-6 text-primary me-3"></i>
                    <h5 className="card-title mb-0">Web Development</h5>
                  </div>
                  <p className="card-text text-muted">
                    Master modern web technologies including React, Node.js, and
                    responsive design.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary">12 Courses</span>
                    <small className="text-muted">42 hours</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card course-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-database display-6 text-success me-3"></i>
                    <h5 className="card-title mb-0">Data Science</h5>
                  </div>
                  <p className="card-text text-muted">
                    Dive into data analysis, machine learning, and statistical
                    computing with Python.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-success">8 Courses</span>
                    <small className="text-muted">36 hours</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card course-card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-phone display-6 text-warning me-3"></i>
                    <h5 className="card-title mb-0">Mobile Development</h5>
                  </div>
                  <p className="card-text text-muted">
                    Build native and cross-platform mobile apps with React Native
                    and Flutter.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-warning">6 Courses</span>
                    <small className="text-muted">28 hours</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <a href="/courses" className="btn btn-primary btn-lg">
              View All Courses
              <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 mb-5">
        <div className="container">
          <div className="card border-0 bg-primary text-white">
            <div className="card-body text-center py-5">
              <h2 className="display-6 fw-bold mb-3">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="lead mb-4">
                Join thousands of students already learning with us
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="/sign-up" className="btn btn-light btn-lg px-4">
                  Start Free Trial
                </a>
                <a href="/courses" className="btn btn-outline-light btn-lg px-4">
                  Explore Courses
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
