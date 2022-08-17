function NavBar() {
  return (

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/agents/add">AddAgent</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/agents/edit/:id">EditAgent</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/agents/delete/:id">DeleteAgent</a>
        </li>
      </ul>
      </div>
    </nav>
  );
}

export default NavBar;
