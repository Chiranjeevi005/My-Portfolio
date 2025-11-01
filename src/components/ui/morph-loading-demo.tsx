import UniqueLoading from "@/components/ui/morph-loading";

export default function DemoOne() {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-8">
      <h2 className="text-2xl font-bold">Morph Loading Demo</h2>
      <div className="flex gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
          <span>Small</span>
          <UniqueLoading variant="morph" size="sm" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>Medium</span>
          <UniqueLoading variant="morph" size="md" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>Large</span>
          <UniqueLoading variant="morph" size="lg" />
        </div>
      </div>
      <div className="w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Full Width Example</h3>
        <div className="h-32 w-full border border-light-border dark:border-dark-border rounded-lg flex items-center justify-center">
          <UniqueLoading variant="morph" size="lg" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}