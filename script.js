const CONFIG = {
  version: '1.0.0',
  status: 'Available now',
  downloadUrl: 'https://github.com/17sh8dy/Atlas/releases/latest/download/Atlas_1.0.0_x64-setup.exe',
  githubUrl: 'https://github.com/17sh8dy/Atlas',
  discordUrl: 'https://discord.gg/XBhER9Z6EB',
}

// The installer is a GitHub release asset (it is far too large for this site to host), named
// Atlas_<version>_x64-setup.exe by `pnpm release` in the Atlas repo. `releases/latest/download/`
// always resolves to the newest release. The installer itself handles in-app update checks.

const THEMES = {
  graphite: { label: 'Graphite', accent: '#8ea2bd' },
  blue: { label: 'Electric Blue', accent: '#86a9ff' },
  violet: { label: 'Slate Violet', accent: '#aa96ff' },
  teal: { label: 'Steel Teal', accent: '#7dc4bd' },
}

const root = document.querySelector('.site-shell')
const modal = document.querySelector('#download-modal')
const nav = document.querySelector('#main-nav')
const menuButton = document.querySelector('#mobile-menu')
const moreButton = document.querySelector('#more-button')
const morePopover = document.querySelector('#more-popover')
const assistantInput = document.querySelector('#assistant-name')
const assistantTargets = document.querySelectorAll('[data-assistant]')
const themeTargets = document.querySelectorAll('[data-theme-label]')
const themeButtons = document.querySelectorAll('[data-theme-choice]')

for (const el of document.querySelectorAll('[data-version]')) el.textContent = CONFIG.version
for (const el of document.querySelectorAll('[data-status]')) el.textContent = CONFIG.status
document.querySelector('#year').textContent = new Date().getFullYear()

function setTheme(id) {
  const theme = THEMES[id] || THEMES.blue
  root.dataset.theme = id
  root.style.setProperty('--accent', theme.accent)
  root.style.setProperty('--accent-soft', theme.accent)
  themeTargets.forEach(el => el.textContent = theme.label)
  themeButtons.forEach(btn => btn.classList.toggle('selected', btn.dataset.themeChoice === id))
  try { localStorage.setItem('atlas-theme', id) } catch {}
}

let savedTheme = 'blue'
try { savedTheme = localStorage.getItem('atlas-theme') || 'blue' } catch {}
setTheme(savedTheme)

themeButtons.forEach(button => button.addEventListener('click', () => setTheme(button.dataset.themeChoice)))

function setAssistantName(value) {
  const name = (value || '').trim() || 'Atlas'
  assistantTargets.forEach(el => el.textContent = name)
  try { localStorage.setItem('atlas-assistant-name', name) } catch {}
}
try { assistantInput.value = localStorage.getItem('atlas-assistant-name') || 'Pilot' } catch {}
setAssistantName(assistantInput.value)
assistantInput.addEventListener('input', e => setAssistantName(e.target.value))

document.querySelectorAll('.mode-selector button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.mode-selector button').forEach(b => b.classList.remove('mode-active'))
  button.classList.add('mode-active')
}))

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open')
  menuButton.setAttribute('aria-expanded', String(open))
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
})
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open')
  menuButton.setAttribute('aria-expanded', 'false')
}))

function openDownload() {
  window.open(CONFIG.downloadUrl, '_blank', 'noopener,noreferrer')
}
function closeDownload() {
  modal.hidden = true
  document.body.style.overflow = ''
}
document.querySelectorAll('[data-download]').forEach(button => button.addEventListener('click', openDownload))
document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeDownload))
modal.addEventListener('click', event => { if (event.target === modal) closeDownload() })
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeDownload(); morePopover.hidden = true } })

moreButton.addEventListener('click', () => { morePopover.hidden = !morePopover.hidden })

document.querySelectorAll('.side-option').forEach(button => button.addEventListener('click', () => {
  button.parentElement.querySelectorAll('.side-option').forEach(b => b.classList.remove('active'))
  button.classList.add('active')
}))

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed')
      observer.unobserve(entry.target)
    }
  }
}, { threshold: 0.12 })
document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
