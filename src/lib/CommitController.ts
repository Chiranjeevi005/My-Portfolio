import { githubService } from "./GitHubService";
import { cdnUploader } from "./CDNUploader";
import { ContentEngine, ValidationResult } from "./content-engine";

/**
 * Orchestrates the Secure Content Write Transaction
 */
export class CommitController {
  
  async executeCommit(params: {
    contentType: "projects" | "experience" | "skills",
    payload: any,
    mediaFiles?: Array<{ data: string, mime: string, size: number }>
  }) {
    const { contentType, payload, mediaFiles } = params;

    // 1. Validation & Normalization via ContentEngine
    let processedData: any;
    let originalList: any[] = [];
    const filePath = `content/${contentType}.json`;

    try {
      // Get current state from GitHub first
      const githubState = await githubService.getFile(filePath);
      originalList = Array.isArray(githubState.content) ? githubState.content : [];

      let result: ValidationResult<any>;
      switch (contentType) {
        case "projects":
          result = ContentEngine.processProject(payload, originalList.find(p => p.id === payload.id));
          break;
        case "experience":
          result = ContentEngine.processExperience(payload, originalList.find(e => e.id === payload.id));
          break;
        case "skills":
          result = ContentEngine.processSkills(payload); 
          break;
        default:
          throw new Error("Invalid content type");
      }

      if (!result.success) {
        throw new Error(`Validation Failed: [${result.field}] ${result.reason}`);
      }

      processedData = result.data;

      // 2. Media Handling
      if (mediaFiles && mediaFiles.length > 0) {
        console.log(`[PIPELINE]: Processing ${mediaFiles.length} media files...`);
        for (const file of mediaFiles) {
          cdnUploader.validateFile(file.size, file.mime);
          const cdnUrl = await cdnUploader.uploadMedia(file.data, file.mime);
          
          // Replace media references in the payload with CDN URLs
          // This logic depends on the field naming convention, assuming "videoUrl" or "image"
          if (processedData.videoUrl) processedData.videoUrl = cdnUrl;
          else if (processedData.image) processedData.image = cdnUrl;
        }
      }

      // 3. GitHub Write Transaction
      let finalContent;
      
      // Identify unique identifier for indexing
      const uniqueKey = contentType === "skills" ? "category" : "id";
      
      const existingIndex = originalList.findIndex((item: any) => item[uniqueKey] === processedData[uniqueKey]);
      
      if (existingIndex > -1) {
        originalList[existingIndex] = processedData;
      } else {
        originalList.push(processedData);
      }
      
      // For experience, ensure auto-sort
      if (contentType === "experience") {
        originalList = ContentEngine.sortExperience(originalList);
      }

      finalContent = originalList;

      // 4. Commit to GitHub
      const identifier = processedData.title || processedData.company || processedData.category || 'unnamed';
      const commitMessage = `Admin: Updated ${contentType} - ${identifier}`;
      await githubService.commitFile(filePath, finalContent, commitMessage, githubState.sha);

      return { success: true, message: "Published successfully" };

    } catch (err: any) {
      console.error("[PIPELINE ERROR]:", err);
      throw err; // Let caller handle the response formatting
    }
  }
}

export const commitController = new CommitController();
