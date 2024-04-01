import Markdown from "markdown-to-jsx";
import Typography from "../typography/Typography";
import LeftRightLayout from "./components/LeftRight/LeftRight";
import BannerImage from "./components/Banner/Banner";

const MarkdownProcessor = ({ content }) => {
  const customRenderers = {
    h1: ({ children }) => <Typography variant="banner">{children}</Typography>,
    h2: ({ children }) => <Typography variant="heading">{children}</Typography>,
    h3: ({ children }) => (
      <Typography variant="smallHeading">{children}</Typography>
    ),
    p: ({ children }) => <Typography variant="body">{children}</Typography>,
    LeftRight: {
      component: LeftRightLayout,
    },
    BannerImage: {
      component: BannerImage,
    },
    button: ({ children, onClick }) => (
      <button onClick={onClick} style={{ padding: "8px", margin: "4px" }}>
        {children}
      </button>
    ),
  };

  return (
    <div className="markdown-container">
      <Markdown options={{ overrides: customRenderers }}>{content}</Markdown>
    </div>
  );
};

export default MarkdownProcessor;
