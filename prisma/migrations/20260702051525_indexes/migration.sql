-- CreateIndex
CREATE INDEX "BlogComment_blogPostId_idx" ON "BlogComment"("blogPostId");

-- CreateIndex
CREATE INDEX "BlogPost_status_createdAt_idx" ON "BlogPost"("status", "createdAt");

-- CreateIndex
CREATE INDEX "BlogPost_status_viewCount_createdAt_idx" ON "BlogPost"("status", "viewCount", "createdAt");

-- CreateIndex
CREATE INDEX "BlogPost_isToggled_status_idx" ON "BlogPost"("isToggled", "status");

-- CreateIndex
CREATE INDEX "BlogPost_categoryID_idx" ON "BlogPost"("categoryID");
