import MyBtn from "@/components/ui/buttons/MyBtn";
import { Layers, ListTree, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const ModelCard = ({ model }) => {
  return (
    <Link to={`/models/${model._id}`} className="block h-full">
      <div className="h-full min-w-[300px] group bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-md dark:shadow-lg dark:shadow-primary/20 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/40 transition-transform flex flex-col">
        <div className="relative h-40 overflow-hidden">
          <img
            src={model.image}
            alt={model.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/600x400?text=Model+Image";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-title font-semibold text-slate-900 dark:text-slate-50 line-clamp-1">
              {model.name}
            </h2>
          </div>

          <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-primary" />
              <span className="truncate">
                {model.framework || "Unknown framework"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <ListTree className="h-3.5 w-3.5 text-primary" />
              <span className="truncate">
                {model.useCase || "General use case"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-primary" />
              <span className="truncate">
                {model.dataset || "Dataset not specified"}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex-1">
            {model.description?.length > 50
              ? model.description.slice(0, 50) + "..."
              : model.description}
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
            <span>
              Added{" "}
              {model.createdAt
                ? new Date(model.createdAt).toLocaleDateString()
                : "Recently"}
            </span>
            <MyBtn
              variant=""
              size="sm"
              icon={ArrowRight}
              className={"font-normal border-none h-auto px-0"}
            >
              View details
            </MyBtn>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModelCard;
