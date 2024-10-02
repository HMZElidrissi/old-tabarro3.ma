"use client";
import { Campaign } from "@/app/lib/definitions";
import { fetchAllCampaigns } from "@/app/lib/data";
import { InboxIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { PhoneIcon, TimerIcon, UserCircle } from "lucide-react";
import ParticipateButton from "@/app/ui/campaigns/ParticipateButton";
import SearchField from "@/app/ui/campaigns/search";
import { useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useTranslation } from "@/app/lib/useTranslation";

const Page = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const loadCampaigns = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCampaigns();
  }, []);

  return (
    <div className="py-20">
      <div className="container mx-auto px-6 md:px-12 xl:px-24">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("campaigns.title")}
          </p>
        </div>
        <SearchField setCampaigns={setCampaigns} />
        {isLoading ? (
          <div className="w-full text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">{t("campaigns.loading")}</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="w-full text-gray-500 py-6 text-center">
            {t("campaigns.noCampaigns")}
          </div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6"
          >
            {campaigns.map((campaign) => (
              <li
                key={campaign.id}
                className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-bold">
                        {campaign.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-gray-500 text-sm">
                      {campaign.description}
                    </p>
                    <div className="mt-2 text-gray-800 text-sm font-medium flex items-center">
                      <MapPinIcon className="h-4 w-4 inline-block mr-2" />
                      {campaign.location}
                    </div>
                    <div className="mt-2 text-diesel-700 text-sm font-medium flex items-center">
                      <TimerIcon className="h-4 w-4 inline-block mr-2" />
                      {formatDistanceToNow(parseISO(campaign.start_time), {
                        addSuffix: true,
                      })}
                    </div>
                    <div className="mt-2 text-gray-600 text-sm font-medium flex items-center">
                      <UserCircle className="h-4 w-4 inline-block mr-2" />
                      {campaign.organization!.name}
                    </div>
                    <div className="mt-1 text-gray-600 text-sm font-medium flex items-center">
                      <InboxIcon className="h-4 w-4 inline-block mr-2" />
                      {campaign.organization!.email}
                    </div>
                    <div className="mt-1 text-gray-600 text-sm font-medium flex items-center">
                      <PhoneIcon className="h-4 w-4 inline-block mr-2" />
                      {campaign.organization!.phone}
                    </div>
                  </div>
                </div>
                <ParticipateButton campaign={campaign} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
