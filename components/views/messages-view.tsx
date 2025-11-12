"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Filter,
  MailOpen,
  MessageSquare,
  Paperclip,
  Search,
  Send,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Message {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  class?: string;
  hasAttachment?: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    from: "Sarah Johnson (Parent)",
    subject: "Question about homework assignment",
    preview: "Hi Ms. Davis, my daughter mentioned the quadratic functions worksheet...",
    timestamp: "2 hours ago",
    read: false,
    starred: false,
    class: "grade-10-math",
    hasAttachment: false,
  },
  {
    id: "2",
    from: "Michael Chen (Parent)",
    subject: "Request for extra tutoring",
    preview: "Hello, I would like to discuss additional support for Michael in algebra...",
    timestamp: "5 hours ago",
    read: false,
    starred: true,
    class: "grade-10-math",
    hasAttachment: false,
  },
  {
    id: "3",
    from: "Principal Williams",
    subject: "Faculty Meeting Reminder",
    preview: "Just a reminder about tomorrow's faculty meeting at 3:30 PM...",
    timestamp: "Yesterday",
    read: true,
    starred: false,
    hasAttachment: true,
  },
  {
    id: "4",
    from: "Emma Rodriguez (Parent)",
    subject: "Thank you for the progress report",
    preview: "I really appreciate the detailed feedback on Emma's recent test...",
    timestamp: "2 days ago",
    read: true,
    starred: true,
    class: "grade-10-math",
    hasAttachment: false,
  },
  {
    id: "5",
    from: "David Thompson (Parent)",
    subject: "Absence notification",
    preview: "David will be absent tomorrow due to a doctor's appointment...",
    timestamp: "3 days ago",
    read: true,
    starred: false,
    class: "grade-10-math",
    hasAttachment: false,
  },
];

export function MessagesView() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const classFilter = searchParams.get("class");

  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<"all" | "unread" | "starred">("all");

  const filteredMessages = React.useMemo(() => {
    let filtered = mockMessages;

    // Filter by class if query param exists
    if (classFilter) {
      filtered = filtered.filter((msg) => msg.class === classFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (msg) =>
          msg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus === "unread") {
      filtered = filtered.filter((msg) => !msg.read);
    } else if (filterStatus === "starred") {
      filtered = filtered.filter((msg) => msg.starred);
    }

    return filtered;
  }, [classFilter, searchQuery, filterStatus]);

  const handleSendReply = () => {
    toast({
      title: "Message Sent",
      description: "Your reply has been sent successfully.",
    });
    setSelectedMessage(null);
  };

  const unreadCount = mockMessages.filter((msg) => !msg.read).length;

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-fg)]">Messages</h1>
            <p className="text-sm text-slate-500 mt-1">
              {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
              {classFilter && (
                <>
                  {" "}
                  • Filtered by:{" "}
                  <Badge variant="outline" className="ml-1">
                    {classFilter}
                  </Badge>
                </>
              )}
            </p>
          </div>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Messages List */}
          <Card className={`p-4 ${selectedMessage ? "lg:col-span-1" : "lg:col-span-3"}`}>
            <div className="space-y-4">
              {/* Search and Filter */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={filterStatus} onValueChange={(value: "all" | "unread" | "starred") => setFilterStatus(value)}>
                    <SelectTrigger className="w-[140px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Messages</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="starred">Starred</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <MailOpen className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Message List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <button
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`w-full text-left p-3 rounded-lg border transition ${
                        selectedMessage?.id === message.id
                          ? "border-blue-500 bg-blue-50"
                          : message.read
                          ? "border-slate-200 hover:border-slate-300"
                          : "border-blue-200 bg-blue-50/30 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p
                          className={`text-sm font-medium ${
                            message.read ? "text-slate-700" : "text-[var(--color-fg)] font-semibold"
                          }`}
                        >
                          {message.from}
                        </p>
                        <div className="flex items-center gap-1">
                          {message.starred && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                          {message.hasAttachment && <Paperclip className="h-3 w-3 text-slate-400" />}
                        </div>
                      </div>
                      <p className={`text-sm mb-1 ${message.read ? "text-slate-600" : "font-medium text-slate-900"}`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-1">{message.preview}</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-slate-400" />
                        <p className="text-xs text-slate-500">{message.timestamp}</p>
                        {message.class && (
                          <Badge variant="outline" className="text-xs py-0">
                            {message.class}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </Card>

          {/* Message Detail */}
          {selectedMessage && (
            <Card className="lg:col-span-2 p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedMessage(null)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Archive
                    </Button>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[var(--color-fg)] mb-2">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">{selectedMessage.from}</span>
                    <span>•</span>
                    <span>{selectedMessage.timestamp}</span>
                    {selectedMessage.class && (
                      <>
                        <span>•</span>
                        <Badge variant="outline">{selectedMessage.class}</Badge>
                      </>
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-slate-700 leading-relaxed">
                      {selectedMessage.preview}
                    </p>
                    <p className="text-slate-700 leading-relaxed mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-slate-700 leading-relaxed mt-4">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                      mollit anim id est laborum.
                    </p>
                    <p className="text-slate-700 leading-relaxed mt-4">
                      Best regards,
                      <br />
                      {selectedMessage.from.split(" (")[0]}
                    </p>
                  </div>
                </div>

                {selectedMessage.hasAttachment && (
                  <div className="border border-slate-200 rounded-lg p-3 flex items-center gap-3">
                    <Paperclip className="h-5 w-5 text-slate-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--color-fg)]">meeting-agenda.pdf</p>
                      <p className="text-xs text-slate-500">245 KB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <h3 className="font-semibold text-[var(--color-fg)]">Reply</h3>
                  <textarea
                    className="w-full min-h-[120px] rounded-md border border-slate-300 p-3 text-sm"
                    placeholder="Type your reply..."
                  />
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <Paperclip className="mr-2 h-4 w-4" />
                      Attach File
                    </Button>
                    <Button onClick={handleSendReply}>
                      <Send className="mr-2 h-4 w-4" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </motion.div>
    </section>
  );
}
