const menuSections = document.querySelectorAll('.menu-section')
const menuTabs = document.querySelectorAll('.menu-tab')

const showInfo = id => {
    menuSections.forEach(section => section.style.display='none')
    menuTabs.forEach(tab => tab.classList.remove('menu-tab-active'))

    document.getElementById(id).style.display = 'block'

    const currnetActiveButton = document.querySelector(`[data-id=${id}]`)
    currnetActiveButton.classList.add('menu-tab-active')
}

