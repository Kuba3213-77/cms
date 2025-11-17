function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© {year} Techni CMS. All rights reserved.</div>
        <div>
          <a className="footer-link" href="/privacy">Privacy</a>
          <a className="footer-link" href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
