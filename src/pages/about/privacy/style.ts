import { createGlobalStyle } from 'styled-components'

export const PrivacyStyle = createGlobalStyle`
.hero-container {
  height: auto !important;
}

.hero-content {
    min-height: calc(100vh - 84px);
}

.hero-content > #privacy h1, h2, h3 {
    margin: 1rem 0;
}

.hero-content > #privacy > * {
  line-height: 2rem;
}

.hero-content > #privacy a {
  outline: none;
  color: var(--text-primary);
  text-decoration: none;
  line-height: 2rem;
}

.hero-content > #privacy a:hover {
  opacity: 0.5;
}

.hero-content blockquote {
  padding: 10px 28px;
  line-height: 2rem;
  border-radius: 6px;
  color: var(--dothq-blue);
  font-weight: 500;
  margin: 0;
  margin-right: auto;
  margin-bottom: 1.5rem;
  background-color: var(--accent-1);
}

.hero-content blockquote > p {
  color: currentColor;
}

.hero-content > #privacy {
  display: flex;
  flex-direction: column;
  margin-right: 24rem;
}

`
