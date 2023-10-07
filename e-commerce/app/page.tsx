import NavBar from "@/Components/NavBar";
import SearchBar from "@/Components/SearchBar";
import Shop from "@/Components/Shop";

export default function Home() {
  return (
    <body className="gap-3">
      <SearchBar />
      <NavBar />
      <Shop />
    </body>
  );
}
