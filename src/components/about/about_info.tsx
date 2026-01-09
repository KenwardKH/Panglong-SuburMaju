import { useTranslation } from "react-i18next";
import { FaBox, FaClock, FaHourglassHalf } from "react-icons/fa6";

export default function AboutInfo() {
  const { t } = useTranslation();

  const infoList = [
    {
      icon: <FaHourglassHalf />,
      info: "10+",
      title: t("about.info_1"),
    },
    {
      icon: <FaClock />,
      info: "09:00-17:00",
      title: t("about.info_2"),
    },
    {
      icon: <FaBox />,
      info: "200+",
      title: t("about.info_3"),
    },
  ];
  return (
    <section className="container mx-auto px-6 text-center pb-16">
      <div className="flex flex-wrap justify-center gap-8">
        {infoList.map((item, index) => (
          <div
            key={index}
            className="px-2 py-4 items-center border border-transparent flex flex-col gap-2 w-[250px] rounded-xl shadow-xl transition duration-500 hover:border-gray-100 hover:translate-y-1"
          >
            <div className="text-3xl text-yellow-600 px-4 py-4 rounded-full bg-yellow-100">
              {item.icon}
            </div>
            <div className="text-2xl font-bold">{item.info}</div>
            <div className="text-xl font-semibold">{item.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
