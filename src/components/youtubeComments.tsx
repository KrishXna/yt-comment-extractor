"use client";

import React, { useState } from "react";
import axios from "axios";

function YouTubeComments() {
  const [comments, setComments] = useState([]);
  const [commentReplies, setcommentReplies] = useState([]);

  const [videoId, setVideoId] = useState("");

  const apikey = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?key=${apikey}&part=snippet,replies&videoId=${videoId}&maxResults=100`
    );
    const result = response.data.items || [];
    setComments(result);
    const replyResponse = (response.data.items || []).filter(
      (item: any) => item.replies !== undefined
    );
    setcommentReplies(replyResponse);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-2">
        <input
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="border py-1.5 px-4 rounded-md w-full md:w-1/2 shadow-xl text-black"
          placeholder="paste yt-video-id here"
        ></input>
        <button
          onClick={handleSubmit}
          className="bg-purple-500 shadow-xl hover:bg-purple-500/80 rounded-md px-4 py-2 w-auto "
        >
          Submit
        </button>
      </div>
      <ul className="pt-10">
        {comments.map((comment: any, i: number) => (
          <li key={comment.id}>
            {i + 1}.&nbsp;
            {comment.snippet.topLevelComment.snippet.textDisplay}
          </li>
        ))}
      </ul>
      {commentReplies.length > 0 ? (
        <>
          <p className="font-semibold">Reply comments</p>
          <ul>
            {commentReplies.map((item: any, i) => (
              <li key={item.id}>
                {i + 1}.&nbsp;
                {item.replies.comments[0].snippet.textDisplay}
              </li>
            ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default YouTubeComments;
