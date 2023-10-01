const menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
        {text: 'all', href: '/catalog/all'},
        {text: 'top selling', href: '/catalog/top'},
        {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
        {text: 'new', href: '/orders/new'},
        {text: 'pending', href: '/orders/pending'},
        {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
        {text: 'profile', href: '/account/profile'},
        {text: 'sign out', href: '/account/signout'},
    ]},
];

let showingSubMenu = false;

const mainEl = document.querySelector('main');
const mainBGC = 'var(--main-bg)';

mainEl.style.backgroundColor = mainBGC;
mainEl.innerHTML = '<h1>SEI Rocks!</h1>';
mainEl.classList.add('flex-ctr');

const topMenuEl = document.getElementById('top-menu');
const topMenuBGC = 'var(--top-menu-bg)';

topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = topMenuBGC;
topMenuEl.classList.add('flex-around');

menuLinks.forEach(link => {
    const newElement = document.createElement('a');
    newElement.setAttribute('href', link.href);
    newElement.innerHTML = link.text;
    topMenuEl.appendChild(newElement);
})

const subMenuEl = document.getElementById('sub-menu')
const subMenuBGC = 'var(--sub-menu-bg)';
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = subMenuBGC;
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

const topMenuLinks = topMenuEl.querySelectorAll('#top-menu > a');

topMenuEl.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.tagName != 'A') {
        return;
    }
    if (event.target.classList.contains('active')) {
        event.target.classList.remove('active');
        showingSubMenu = false;
        subMenuEl.style.top = '0';
        return;
    }
    topMenuLinks.forEach(link => {
        link.classList.remove('active');
    })
    event.target.classList.add('active');
    
    let clickedLink;
    
    menuLinks.forEach(linkArray => {
        if (event.target.innerHTML == linkArray.text) {
            clickedLink = linkArray;
        }
    })
    
    if ('subLinks' in clickedLink) {
        showingSubMenu = true;
    }else {
        showingSubMenu = false;
    }
    
    if (showingSubMenu === true) {
        buildSubMenu(clickedLink.subLinks);
        subMenuEl.style.top = '100%';
    } else {
        subMenuEl.style.top = '0';
        mainEl.innerHTML = '<h1>about</h1>';
    }
})

function buildSubMenu(subLink) {
    subMenuEl.innerHTML = '';
    subLink.forEach(link => {
        const newElement = document.createElement('a');
        newElement.setAttribute('href', link.href);
        newElement.innerHTML = link.text;
        subMenuEl.appendChild(newElement);
    })
}

subMenuEl.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.tagName != 'A') {
        return;
    }
    console.log(event);

    showingSubMenu = false;
    subMenuEl.style.top = '0';
    topMenuLinks.forEach(link => {
        link.classList.remove('active');
    })
    mainEl.innerHTML = `<h1>${event.target.innerHTML}</h1>`;
})