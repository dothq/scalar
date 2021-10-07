import dynamic from "next/dynamic";
import config from "../../cms/config";

const CMS = dynamic(
    () => import("netlify-cms-app").then((cms: any) => cms.init({ config })),
    { ssr: false, loading: () => (
        <div className={"w-full h-screen flex justify-center items-center"}>
            <h1 className={"text-2xl font-semibold"}>Loading...</h1>
        </div>
    ) }
);

const AdminPage: React.FC = () => {
    return <CMS />;
};

export default AdminPage;