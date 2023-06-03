import ArticleReviewBody from "../../components/ArticleReviewBody";
import { NewsListProvider } from "@/app/context/NewsListContext";

export default function Analisis() {
   return (
      <NewsListProvider >
         <ArticleReviewBody />
      </NewsListProvider>
   )
}