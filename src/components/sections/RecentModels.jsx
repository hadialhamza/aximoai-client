import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import ModelCard from "@/components/shared/card/ModelCard";
import Container from "../ui/container/Container";
import MyBtn from "../ui/buttons/MyBtn";
import SectionHeading from "../ui/sectionHeading/SectionHeading";
import { Box, Sparkles } from "lucide-react";
import ModelsSkeleton from "@/components/skeletons/ModelsSkeleton";

const RecentModels = () => {
  const api = useAxios();

  const { data: models = [], isLoading: loading } = useQuery({
    queryKey: ["recentModels"],
    queryFn: async () => {
      const res = await api.get("/models/recent");
      return res.data.result;
    },
  });

  return (
    <section>
      <Container>
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 ">
          <SectionHeading
            badge="Latest Models"
            icon={Sparkles}
            title={
              <span>
                Recent <span className="text-primary">AI Models</span>
              </span>
            }
            description="Explore the latest AI models added to AximoAI. Recently created models appear here automatically."
            align="left"
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

        {loading && <ModelsSkeleton />}

        {!loading && models.length > 0 && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {models?.map((model) => (
              <ModelCard key={model._id} model={model} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default RecentModels;
