-- CreateIndex
CREATE INDEX "Advertisement_AdType_idx" ON "Advertisement"("AdType");

-- CreateIndex
CREATE INDEX "Advertisement_isAdRunning_idx" ON "Advertisement"("isAdRunning");

-- CreateIndex
CREATE INDEX "Advertisement_createdAt_idx" ON "Advertisement"("createdAt");

-- CreateIndex
CREATE INDEX "BlogPost_status_createdAt_idx" ON "BlogPost"("status", "createdAt");

-- CreateIndex
CREATE INDEX "BlogPost_categoryID_createdAt_idx" ON "BlogPost"("categoryID", "createdAt");

-- CreateIndex
CREATE INDEX "BlogPost_authorID_createdAt_idx" ON "BlogPost"("authorID", "createdAt");

-- CreateIndex
CREATE INDEX "BlogPost_viewCount_idx" ON "BlogPost"("viewCount");

-- CreateIndex
CREATE INDEX "BlogPost_isToggled_idx" ON "BlogPost"("isToggled");
