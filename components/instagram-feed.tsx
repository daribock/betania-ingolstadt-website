type InstagramFeedProps = {
  username: string;
  aspectRatio?: string;
};

export const InstagramFeed = ({
  username,
  aspectRatio = 'aspect-square',
}: InstagramFeedProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className={`w-full max-w-4xl ${aspectRatio}`}>
        <iframe
          src={`https://www.instagram.com/${username}/embed`}
          className="w-full h-full rounded-lg"
          frameBorder="0"
          scrolling="no"
        />
      </div>
    </div>
  );
};
