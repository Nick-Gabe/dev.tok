import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";

export type SearchComponentHandler = {
    toggle: () => void;
}

export const SearchComponent = forwardRef<SearchComponentHandler>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [historic, setHistoric] = useState<Array<string>>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const storedItems = useRef<Array<string>>(JSON.parse(localStorage.getItem("searchItems") || "[]")).current;

  useImperativeHandle(ref, () => ({
    toggle: () => {
      setIsOpen(!isOpen);
    }
  }));

  const updateHistoric = useCallback(() => {
    const currentQuery = searchRef.current?.value;

    if (currentQuery && !historic.includes(currentQuery)) {
      const newHistoric = [...historic, currentQuery];
      setHistoric(newHistoric);
      localStorage.setItem("searchItems", JSON.stringify(newHistoric));
    }
  }, [historic]);

  const searchHandler = () => {
    const searchQuery = searchRef.current?.value;

    if (searchQuery) {
      updateHistoric();
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const removeSearchHistoricItem = (item: string) => {
    const newHistoric = historic.filter(searchItem => searchItem !== item);
    setHistoric(newHistoric);
    localStorage.setItem("searchItems", JSON.stringify(newHistoric));
  }

  const removeAllSearchHistoricItem = () => {
    setHistoric([]);
    localStorage.setItem("searchItems", "");
  }

  useEffect(() => {
    setHistoric(storedItems);
  }, []);

  return (
    <div 
        ref={backdropRef}
        className={`fixed inset-0 w-full h-full flex justify-center z-50 ${isOpen ? "" : "pointer-events-none"}`}
    >
      <motion.div
        className="absolute top-0 w-full max-w-[500px] h-dyn-screen bg-black/50 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
        style={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -10
        }}
        aria-hidden={!isOpen}
        transition={{
          bounce: 0,
          ease: "circOut",
        }}
      >
        <div className="p-6">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Fechar"
            className="ml-auto mb-8 block"
          >
            <X size={32} color="#fff" />
          </button>

          <div className="flex items-center">
            <input 
              type="text" 
              name="search" 
              id="search"
              placeholder="Pesquisar..."
              ref={searchRef}
              className="bg-white w-full h-10 px-4 outline-none text-black placeholder:text-black" 
            />
            <button 
              type="submit"
              onClick={searchHandler}
              className="flex items-center justify-center h-10 w-10 bg-gray-600"
            >
              <MagnifyingGlass color="#fff" size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {historic.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg text-white font-semibold">Pesquisas recentes</h2>
                <button onClick={removeAllSearchHistoricItem}>Limpar todos</button>
              </div>
              <div className="overflow-y-scroll h-[70dvh]">
                {historic.map(item => (
                  <div 
                    key={item} 
                    className="flex items-center mb-4 pb-4 border-b border-b-[rgba(255,255,255,0.2)] last:border-b-0"
                  >
                    <Link to={"/teste"} className="text-white w-full">{item}</Link>
                    <button onClick={() => removeSearchHistoricItem(item)}>
                      <X size={20} color="#fff" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </motion.div>
    </div>
  )
});
