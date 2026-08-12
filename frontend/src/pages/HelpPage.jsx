import { useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import HelpHero from "../components/help/HelpHero";
import HelpCategories from "../components/help/HelpCategories";
import FAQSection from "../components/help/FAQSection";
import HelpGuide from "../components/help/HelpGuide";
import HelpSupport from "../components/help/HelpSupport";
import { helpArticles } from "../constants/helpArticles";

const HelpPage = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return helpArticles;

    return helpArticles.filter(
      (article) =>
        article.question.toLowerCase().includes(query) ||
        article.answer.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <HelpHero search={search} setSearch={setSearch} />

      {!search && <HelpCategories />}

      <FAQSection articles={filteredArticles} search={search} />

      {!search && <HelpGuide role={user?.role} />}

      {!search && <HelpSupport />}
    </div>
  );
};

export default HelpPage;
