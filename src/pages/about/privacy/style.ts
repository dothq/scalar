import { createGlobalStyle } from "styled-components";

export const PrivacyStyle = createGlobalStyle`
.hero-content {
    min-height: calc(100vh - 289px);
}

.hero-content > #privacy > h1, h2, h3 {
    margin: 1rem 0;
}

.hero-content > #privacy > * {
  line-height: 2rem;
}

.hero-content > #privacy > a {
  outline: none;
  color: var(--text-primary);
  text-decoration: none;
  line-height: 2rem;
}

.hero-content > #privacy > a:hover {
  opacity: 0.5;
}

.hero-content > blockquote {
  border: 1px solid var(--text-primary);
  padding: 10px 28px;
  line-height: 2rem;
  border-radius: 6px;
  background-color: #256ef52b;
  color: var(--text-primary);
  font-weight: 500;
  margin: 0;
  margin-right: auto;
  margin-bottom: 1.5rem;
}

.hero-content > #privacy {
  display: flex;
  flex-direction: column;
  margin-right: 24rem;
}

`;