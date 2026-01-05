import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "@/hooks/useAxios";
import RecentModelCard from "@/components/ui/cards/RecentModelCard";
import Container from "../ui/container/Container";
import MyBtn from "../ui/buttons/MyBtn";
import SectionHeading from "../ui/sectionHeading/SectionHeading";
import { Box } from "lucide-react";

const RecentModels = () => {
  const api = useAxios();
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState([]);

  useEffect(() => {
    setLoading(true);
    api
      .get("models/recent")
      .then((res) => {
        setModels(res?.data?.result);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [api]);

  return (
    <section>
      <Container>
        <div className="bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 rounded-2xl shadow-[0_1px_15px_rgba(0,0,0,0.15)] p-5 md:p-6 lg:p-8">
          <SectionHeading
            badge="Latest Models"
            title={
              <span>
                Latest <span className="text-primary">AI Models</span>
              </span>
            }
            description="Explore the latest AI models added to AximoAI. Recently created models appear here automatically."
            align="left"
            className="md:text-left text-center items-center md:items-start mx-auto md:mx-0"
          />
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <Link to="/models">
              <MyBtn
                variant="outline"
                icon={Box}
                className="border-primary/50 hover:border-primary"
              >
                View all models
              </MyBtn>
            </Link>
          </div>
        </div>

        {loading && (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="group relative border-2 border-slate-200 dark:border-slate-800 flex w-full flex-col rounded-xl bg-white/95 dark:bg-slate-950/80 bg-clip-border shadow-lg"
              >
                <div className="skeleton relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-clip-border shadow-xl ">
                  <div className="skeleton h-full w-full bg-slate-200 dark:bg-slate-800 selection:bg-slate-200" />
                </div>
                <div className="p-6">
                  <div className="skeleton mb-2 h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-2 mb-3">
                    <div className="skeleton h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="skeleton h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="skeleton h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="flex justify-center">
                    <div className="skeleton h-8 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="skeleton h-12 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && models.length > 0 && (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {models?.map((model) => (
              <RecentModelCard key={model._id} model={model} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default RecentModels;
