function NavBar() {
  return (

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">Agents</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/:expand">Expand</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/agents/add">Add</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/agents/edit/:id">Edit</a>
        </li>
      </ul>
      </div>
    </nav>
  );
}

export default NavBar;
