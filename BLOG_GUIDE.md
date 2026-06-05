# 📝 Rêveur Blog Authoring Guide

Welcome to the authoring guide for your personal blog! This platform uses **MDX** (Markdown + JSX) powered by `content-collections`, which allows you to write standard Markdown while having the power to include React components if needed.

## 1. Creating a New Post

1. Navigate to the `src/content/blog/` directory.
2. Create a new `.mdx` file. The name of the file will become the URL slug of your post.
   - *Example:* Creating `deep-learning-basics.mdx` will result in the URL `r1verrdao.id.vn/blog/deep-learning-basics`.

## 2. Writing Frontmatter

At the very top of your `.mdx` file, you **must** include a frontmatter block enclosed in `---`. This provides the metadata for your post.

```yaml
---
title: "Deep Learning Basics: A Visual Guide"
summary: "Understanding neural networks from the ground up."
date: "2026-06-15"
tags: ["AI", "Machine Learning", "Tutorial"]
---
```

- **title**: The main headline of your blog post.
- **summary**: A short description that appears on the blog list page.
- **date**: The publication date in `YYYY-MM-DD` format.
- **tags**: (Optional) A list of categories/tags related to the post.

## 3. Formatting Content

Below the frontmatter, you can write your content using standard Markdown syntax. The blog is heavily styled with custom CSS to ensure your typography looks stunning.

### Text & Headings
```markdown
## This is a Heading 2 (H2)
### This is a Heading 3 (H3)

You can write **bold**, *italic*, or ~~strikethrough~~ text.
```
> **Pro Tip:** Your `H2` and `H3` headings will automatically be scanned and added to the **Table of Contents** sidebar on desktop screens!

### Blockquotes
Use `>` to create a blockquote. It has been beautifully styled with a cyan left-border and glassmorphic background.
```markdown
> "The cosmos is within us. We are made of star-stuff." - Carl Sagan
```

### Code Blocks
For syntax highlighting, use triple backticks \`\`\` followed by the language name (e.g., `python`, `typescript`, `bash`).
```markdown
\```python
import torch
import torch.nn as nn

print("Hello, AI World!")
\```
```

## 4. How to Add Images

Adding images to your blog posts is incredibly simple and highly recommended to break up long blocks of text!

### Step 1: Store the Image
Place your image file (e.g., `neural-net.png`) into the `public` directory of your project. 
To keep things organized, it is recommended to create a dedicated folder like `public/images/blog/`.

### Step 2: Reference it in your Post
Use the standard Markdown image syntax. **Important:** The URL path must start with `/` (which maps directly to the `public` folder).

```markdown
![Architecture of a Neural Network](/images/blog/neural-net.png)
```

- `![Alt Text]` is the description of the image (useful for accessibility and SEO).
- `(/path/to/image.jpg)` is the URL.

The CSS is already pre-configured to automatically make your images responsive, rounded (`12px` border-radius), and nicely spaced with a subtle glass border!

## 5. Publishing

Since this project is statically exported and hosted via GitHub Pages, publishing is fully automated.

1. Save your `.mdx` file.
2. Commit your changes:
   ```bash
   git add .
   git commit -m "blog: add deep learning post"
   ```
3. Push to the `main` branch:
   ```bash
   git push
   ```

GitHub Actions will automatically pick up the new post, compile the static HTML, and deploy it to your live website! 🚀
