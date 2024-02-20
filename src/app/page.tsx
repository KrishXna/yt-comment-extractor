import YouTubeComments from "@/components/youtubeComments";

export default function Home() {
  return (
    <div className="w-full min-h-screen h-auto bg-gradient-to-t from-purple-500 to-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <h2 className="font-bold text-2xl py-4 text-center">
          Extract Youtube Comments
        </h2>
        <YouTubeComments />
      </div>
    </div>
  );
}
